using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using System.Collections.Specialized;
using LuaInterface;

public class LuaConsole : MonoBehaviour {

	Lua lua = new Lua();
	string consoleOutput = "-----\nLua 5.1\nLuaInterface 1.5.3\n-----";
	string consoleInput = "";

	bool showConsole = false;
	public Rect consoleRect = new Rect(16, 16, 480, 320);
	Vector2 scrollPosition = Vector2.zero;
	public GUISkin skin;

	void Start(){
		lua.RegisterFunction("clear", this, this.GetType().GetMethod("ClearConsole"));
		lua.RegisterFunction("print", this, this.GetType().GetMethod("Print"));
		lua.RegisterFunction("changelevel", this, this.GetType().GetMethod("ChangeLevel"));
		lua.RegisterFunction("map", this, this.GetType().GetMethod("ChangeLevel"));
	}

	void Update(){

		if( Input.GetKeyDown(KeyCode.F1) ){
			showConsole = !showConsole;
		}

	}

	void OnGUI(){
		GUI.skin = skin;

		if(showConsole){
			consoleRect = GUI.Window(999, consoleRect, ConsoleFunction, "Console");
		}
	}

	public void ConsoleFunction(int windowID){

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

		//People will make mistakes, expect errors
		try {
			lua.DoString(luaRunStr);
		}
		catch (LuaException error){
			consoleOutput += luaRunStr;
			consoleOutput += "\n>	Error : " + error;
		}

		consoleInput = "";

	}

	public void ClearConsole(){
		consoleOutput = "";
	}

	public void Print(string printStr){
		consoleOutput += "\n" + consoleInput + "\n>		" + printStr;
	}

	public void ChangeLevel(string levelName){

		switch(levelName){

			case "shooting_range":
				Application.LoadLevel("shooting_range");
				consoleOutput += "\n" + consoleInput + "\n>		Loading shooting range. Please wait...";
				break;

			case "game":
				Application.LoadLevel("scene");
				consoleOutput += "\n" + consoleInput + "\n>		Loading main game scene. Please wait...";
				break;

			case "winscene":
				Application.LoadLevel("winscene");
				consoleOutput += "\n" + consoleInput + "\n>		Loading ending sequence scene. Please wait...";
				break;

			case "menu":
				Application.LoadLevel("splashscreen");
				consoleOutput += "\n" + consoleInput + "\n>		Loading main menu scene. Please wait...";
				break;

			default:
				consoleOutput += "\n" + consoleInput + "\n>		Level " + levelName + " is not a valid level.";
				break;

		}

	}

}
