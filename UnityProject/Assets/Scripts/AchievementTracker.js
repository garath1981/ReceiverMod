
//Objects
var guiSkin : GUISkin;
var achievementJingle : AudioClip;
var colt1911 : GameObject;

//Achievement Icons
var qrTex : Texture2D;

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
	GUI.DrawTexture( Rect(XPos, Screen.height - 256, 96, 96), qrTex, ScaleMode.StretchToFill, true, 0.0f);
	GUI.Label( Rect(XPos + 104, Screen.height - 256, 128, 128), "Gunslinger", "ShotType");
	GUI.Label( Rect(XPos + 104, Screen.height - 204, 128, 128), "Reloaded in " + qr_finaltime.ToString("F3") + "s", "ShotScore");

	if(Time.time >= lastUnlock && Time.time <= lastUnlock + noticeStayTime){
		XPos = Mathf.Lerp(XPos, 64, Time.deltaTime * 2);
	} else {
		XPos = Mathf.Lerp(XPos, XPos_Default, Time.deltaTime * 2);
	}

}

function UnlockNew(){
	lastUnlock = Time.time;
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
		UnlockNew();

		//Unlock
		var achTime = (Time.time - (qr_ejectmag + qr_reloadspeed));
		achTime += qr_reloadspeed;
		qr_finaltime = achTime;
		print("Achievement Get! Time: " + qr_finaltime.ToString());
		camera.main.gameObject.audio.PlayOneShot(achievementJingle);

		//Reset
		qr_track = false;
		qr_ejectmag = 0.0;
	}	

}
