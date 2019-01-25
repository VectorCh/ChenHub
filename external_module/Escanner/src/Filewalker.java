import java.io.File;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import static java.nio.charset.StandardCharsets.*;

public class Filewalker {

	static int n_ficheros = 0;
	static int n_directorios = 0;
	static int profundidad = -1; // Profundidad de la ruta seleccionada
	static String cadena = null; // cadena del directorio seleccionado
	static long total_bytes = 0; // Número de bytes totales
	static JSONObject board = new JSONObject();
	static JSONArray array_files = new JSONArray();	
	static String toUTF8 (String str) {
//		byte[] ptext = str.getBytes(ISO_8859_1); 
//		String value = new String(ptext, UTF_8); 		
		byte[] byteText = str.getBytes(Charset.forName("UTF-8"));
		//To get original string from byte.
		String value = null;
		try {
			value = new String(byteText , "UTF-8");
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return value;
	}
	
	static JSONObject getInfoFile(long file_size, String file, int abs_depth, int rel_depth, JSONArray folder, String route) throws JSONException {
		JSONObject jsonObject = new JSONObject();
		JSONArray jsonArray = new JSONArray();
		jsonObject.put("file_size", file_size);
		jsonObject.put("file", file);
		jsonObject.put("abs_depth", abs_depth);
		jsonObject.put("rel_depth", rel_depth);		
		jsonObject.put("folder", jsonArray.put(folder));
		jsonObject.put("filePath", route.replaceAll("\\\\", "/"));
		return jsonObject;
	}
	
	static JSONObject getGeneralInfo(long all_file_size, String route, String str, int depth, int n_directory, int n_file)
			throws JSONException {
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("all_file_size", all_file_size);
		jsonObject.put("inicial_route", route);
		jsonObject.put("depth", depth);
		jsonObject.put("str", str);
		jsonObject.put("n_directory", n_directory);
		jsonObject.put("n_file", n_file);
		return jsonObject;
	}

	public void walk(String path) throws JSONException {
		File root = new File(path);
		File[] list = root.listFiles();
		if (list == null)
			return;
		for (File f : list) {
			if (f.isDirectory()) {
				n_directorios++;
				walk(f.getAbsolutePath());// recur
			} else {
				n_ficheros++;
				long bytes = f.length();// Peso del fichero
				total_bytes += bytes;
				// String fileName = f.getName();
				String filePath = f.getAbsolutePath();
				parsingRute(filePath, bytes);
			}
		} // End for
	}

	public static void parsingRute(String route, long bytes) throws JSONException {	
		JSONArray jsonArray = new JSONArray();
		String parts[] = route.split("\\\\");
		int last = parts.length - 1;
		int depth = last - profundidad;
		String folders[] = new String[depth];
		for (int i = 0; i < depth; i++) {
			folders[i] = parts[profundidad + i];
			JSONObject folderObj = new JSONObject();	
			folderObj.put("name", folders[i]);
			jsonArray.put(folderObj);
		}
		// long file_size, String file, int abs_depth, int rel_depth
		array_files.put(getInfoFile(bytes, parts[last], (parts.length-1), depth, jsonArray, route));
	}

	public static void main(String[] args) throws JSONException, IOException {
		System.out.println("Escanenando directorio...");
		Filewalker fw = new Filewalker();
		// Ruta a recorrer
		String route = "C:\\Users\\Yang Chen\\Documents\\Rep0\\maintest\\store\\video";
		String dest = "C:\\Users\\Yang Chen\\Documents\\Rep0\\maintest\\store\\json\\files_vidus_ssd.json";
		String parts[] = route.split("\\\\");
		profundidad = parts.length - 1;
		cadena = parts[profundidad];
		fw.walk(route);
		// all_file_size, route, str, depth, n_directory, n_file
		board.put("info", getGeneralInfo(total_bytes, route.replaceAll("\\\\", "/"), cadena, profundidad, n_directorios, n_ficheros));
		board.put("files", array_files);		
//		try (FileWriter file = new FileWriter(dest)) {
//			System.out.println("Escribiendo fichero...");
//			file.write(board.toString());
//			System.out.println("End.");
//		}		
		// USO outputStreamWriter en vez de filewriter para solucionar la escritura para que sea UTF8
		try (OutputStreamWriter file = new OutputStreamWriter(new FileOutputStream(dest), StandardCharsets.UTF_8)){
			System.out.println("Escribiendo fichero...");
			file.write(board.toString());
			System.out.println("End.");
		}
	}
}