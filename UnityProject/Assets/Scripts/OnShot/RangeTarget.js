#pragma strict

enum targetParts {
	Head,
	Torso,
	Legs,
	LeftArm,
	RightArm
}
var targetPart = targetParts.Head;

class RangeTarget extends OnShotCommand {

	function OnShot(){

		switch(targetPart){

			case targetParts.Head:
				//print("Hit Head");
				camera.main.transform.GetComponent(TargetPracticeHud).SetTargetImg("head");
				break;
			case targetParts.Torso:
				//print("Hit Torso");
				camera.main.transform.GetComponent(TargetPracticeHud).SetTargetImg("torso");
				break;
			case targetParts.Legs:
				//print("Hit Legs");
				camera.main.transform.GetComponent(TargetPracticeHud).SetTargetImg("legs");
				break;
			case targetParts.LeftArm:
				//print("Hit Left Arm");
				camera.main.transform.GetComponent(TargetPracticeHud).SetTargetImg("leftarm");
				break;
			case targetParts.RightArm:
				//print("Hit Right Arm");
				camera.main.transform.GetComponent(TargetPracticeHud).SetTargetImg("rightarm");
				break;

		}

	}

}
