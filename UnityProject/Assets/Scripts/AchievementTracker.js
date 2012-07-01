
//Objects
var guiSkin : GUISkin;
var achievementJingle : AudioClip;
var colt1911 : GameObject;

//Achievement Icons
var QuickReloadTex : Texture2D;
var TerminalVelocityTex : Texture2D;
var ElectrocutedDeathTex : Texture2D;
var ShotToDeathTex : Texture2D;
var OutOfWorldTex : Texture2D;

//Achievement Vars
private var achName : String;
private var achSubline : String;
private var achTexture : Texture2D;

//Other
private var XPos_Default = -512;
private var XPos = -512;
private var lastUnlock : float = Mathf.Infinity;
private var noticeStayTime : float = 5.0;

function Start(){

	//Delay finding by 1 second so everything can spawn
	StartCoroutine("FindGameObjects");
	
}

function FindGameObjects(){

	yield WaitForSeconds(1.0);
	colt1911 = gameObject.FindWithTag("Weapons/Colt1911A1");

}

function OnGUI(){

	GUI.skin = guiSkin;
	if(achTexture)
		GUI.DrawTexture( Rect(XPos, Screen.height - 256, 96, 96), achTexture, ScaleMode.StretchToFill, true, 0.0f);
	GUI.Label( Rect(XPos + 104, Screen.height - 256, 128, 128), achName, "ShotType");
	GUI.Label( Rect(XPos + 104, Screen.height - 204, 128, 128), achSubline, "ShotScore");

	if(Time.time >= lastUnlock && Time.time <= lastUnlock + noticeStayTime){
		XPos = Mathf.Lerp(XPos, 64, Time.deltaTime * 2);
	} else {
		XPos = Mathf.Lerp(XPos, XPos_Default, Time.deltaTime * 2);
	}

}

function PushNewNotification( achNameStr : String, achSub : String, achImg : Texture2D ){

	gameObject.FindWithTag("Player").audio.PlayOneShot(achievementJingle);
	lastUnlock = Time.time;
	achName = achNameStr;
	achSubline = achSub;
	achTexture = achImg;

}

/*******************
	Quick Reload Achievement
		Reload your weapon in less than X seconds
*******************/
private var qr_track = false;
private var qr_ejectmag : float = 0.0;
private var qr_reloadspeed = 2.0;
private var qr_finaltime = 0.0;

function QuickReload(){

	var chamberedRound = colt1911.GetComponent(GunScript).round_in_chamber_state;
	if(chamberedRound.ToString() == "FIRED"){
		qr_track = true;
		qr_ejectmag = Time.time;
	}

}

function QuickReload_ChamberRound(){

	if( qr_track && Time.time <= qr_ejectmag + qr_reloadspeed ){

		//Unlock
		var achTime = (Time.time - (qr_ejectmag + qr_reloadspeed));
		achTime += qr_reloadspeed;
		qr_finaltime = achTime;
		//print("Achievement Get! Time: " + qr_finaltime.ToString());
		PushNewNotification("Gunslinger", "Reloaded in " + qr_finaltime.ToString("F3") + "s", QuickReloadTex);

		//Reset
		qr_track = false;
		qr_ejectmag = 0.0;

	}	

}

/*******************
	Terminal Velocity Achievement
		Hit the ground with terminal velocity
*******************/
function TerminalVel_Unlock( landingVel : float ){

	//print("Achievement Get!");
	PushNewNotification("Terminal Velocity", "You hit the ground at " + (landingVel * -1).ToString("F2") + "m/s", TerminalVelocityTex);

}

/*******************
	Out of the Box Achievement
		Fall out of the level
*******************/
function OutOfLevel_Unlock(){

	//print("Achievement Get!");
	PushNewNotification("Out of the Box", "Did that seem like a good idea?", OutOfWorldTex);

}

/*******************
	Outrun Tazebot Achievement
		Attempt to outrun a TazeBot
*******************/
function RunningTazeBot_Unlock(){

	//print("Achievement Get!");
	PushNewNotification("Shock to the System", "You can't outrun those...", ElectrocutedDeathTex);

}

/*******************
	 Achievement
		Attempt to sprint past a turret
*******************/
function RunningShot_Unlock(){

	//print("Achievement Get!");
	PushNewNotification("The Quick and The Dead", "You are the dead.", ShotToDeathTex);

}
