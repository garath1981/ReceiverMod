using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using System.Collections.Specialized;
using LuaInterface;

public class LuaConsole : MonoBehaviour {

	Lua lua = new Lua();
	string consoleOutput = "-----";
	string consoleInput = "";

	bool showConsole = false;
	Rect consoleRect = new Rect(16, 16, 480, 320);
	Vector2 scrollPosition = Vector2.zero;
	public GUISkin skin;

	void Start(){
		lua.RegisterFunction("print", this, this.GetType().GetMethod("Print"));

		lua.DoString("print('Lua 5.1')");
		lua.DoString("print('LuaInterace 1.5.3')");
		lua.DoString("print('-----')");
	}

	void Update(){

		if( Input.GetKeyDown(KeyCode.F1) ){
			showConsole = !showConsole;
		}

	}

	void OnGUI(){
		GUI.skin = skin;

		if(showConsole)
			consoleRect = GUI.Window(999, consoleRect, ConsoleFunction, "Paused");
	}

	void ConsoleFunction(int windowID){

		scrollPosition = GUILayout.BeginScrollView(scrollPosition);
			GUILayout.Label(consoleOutput);
		GUILayout.EndScrollView();

		//Catch pressing the return key
		if( Event.current.Equals(Event.KeyboardEvent("return")) && GUI.GetNameOfFocusedControl() == "consoleInputField" ){
			DoConsoleLua();
		}

		GUILayout.FlexibleSpace();
			GUI.SetNextControlName("consoleInputField");
			consoleInput = GUILayout.TextField(consoleInput, 255);
	}

	void DoConsoleLua(){

		string luaRunStr = consoleInput;
		consoleInput = "";

		//People will make mistakes, expect errors
		try {
			lua.DoString(luaRunStr);
		}
		catch (LuaException error){
			consoleOutput += "\nError : " + error;
		}

	}

	public void Print(string printStr){
		consoleOutput += "\n" + printStr;
	}

}
