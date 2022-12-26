import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RegexFindReplace {

	public static void main(String[] args) {
		// The regex pattern
		final String REGEX_PATTERN = "\\((\\d{3})\\)(\\.\\d{3}\\.\\d{4})";
		final String inputFileName = "regex30.txt";
		// Create a Pattern object
		Pattern r = Pattern.compile(REGEX_PATTERN);

		// Read the input file line by line
		try (BufferedReader bufferedReader = new BufferedReader(
				new InputStreamReader(RegexFindReplace.class.getClassLoader().getResourceAsStream(inputFileName)))) {
			String line;
			while ((line = bufferedReader.readLine()) != null) {

				// Now create matcher object.
				Matcher m = r.matcher(line);

				// Apply the regex pattern to each line
				// If pattern matches, perform replacement on the current line.
				if (m.find()) {
					line = m.replaceAll(m.group(1)
							                    + m.group(2));
					System.out.println(line);
				}

			}
		} catch (IOException e) {
			e.printStackTrace();
		}

	}

}
