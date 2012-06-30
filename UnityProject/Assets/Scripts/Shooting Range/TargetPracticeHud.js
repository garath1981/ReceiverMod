
var guiSkin : GUISkin;
enum targetImg {
	Blank,
	Head,
	Torso,
	Legs,
	LeftArm,
	RightArm
}
var shownTargetImg = targetImg.Blank;
var targetHitStr = "Hit";
var targetHitScore = 100;
var targetImgs : Texture2D[];
var ui_beep : AudioClip;

private var hitYPos = -196;
private var lastImg = 0;

function OnGUI(){

	GUI.skin = guiSkin;
	GUI.DrawTexture( Rect(Screen.width / 2 - 128, hitYPos, 128, 128), targetImgs[shownTargetImg], ScaleMode.StretchToFill, true, 0.0f);
	GUI.Label( Rect(Screen.width / 2 - 24, hitYPos + 8, 128, 128), targetHitStr, "ShotType");
	if(targetHitScore == 0){
		GUI.Label( Rect(Screen.width / 2 - 24, hitYPos + 56, 128, 128), "", "ShotScore");
	} else {
		GUI.Label( Rect(Screen.width / 2 - 24, hitYPos + 56, 128, 128), "+" + targetHitScore.ToString(), "ShotScore");
	}

	if( Time.time > lastImg + 1.0 ){
		hitYPos = Mathf.Lerp(hitYPos, -196, Time.deltaTime * 1);
	}

}

function SetTargetImg( imgName : String ){

	audio.PlayOneShot(ui_beep);
	lastImg = Time.time;
	hitYPos = 16;

	switch(imgName){

		case "blank":
			shownTargetImg = targetImg.Blank;
			targetHitStr = "Missed!";
			targetHitScore = 0;
			break;
		case "head":
			shownTargetImg = targetImg.Head;
			targetHitStr = "Headshot!";
			targetHitScore = 250;
			break;
		case "torso":
			shownTargetImg = targetImg.Torso;
			targetHitStr = "Torso Hit!";
			targetHitScore = 200;
			break;
		case "legs":
			shownTargetImg = targetImg.Legs;
			targetHitStr = "Legs Hit!";
			targetHitScore = 100;
			break;
		case "leftarm":
			shownTargetImg = targetImg.LeftArm;
			targetHitStr = "Left Arm Hit!";
			targetHitScore = 150;
			break;
		case "rightarm":
			shownTargetImg = targetImg.RightArm;
			targetHitStr = "Right Arm Hit!";
			targetHitScore = 150;
			break;

	}

}
