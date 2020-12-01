package carbook.service;

import java.util.Random;

public class GenerateCode {

	public static String generateString()
	{
		Random rng =new Random();
		String characters="qwertyuiopasdfghjklzxcvbnm123465798";
	    char[] text = new char[10];
	    for (int i = 0; i < 10; i++)
	    {
	        text[i] = characters.charAt(rng.nextInt(characters.length()));
	    }
	    return new String(text);
	}
}
