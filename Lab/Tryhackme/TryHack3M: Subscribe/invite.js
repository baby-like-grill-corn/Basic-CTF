function e(){
	var e=window.location.hostname;
	if(e==="capture3millionsubscribers.thm"){
		var o=new XMLHttpRequest;
		o.open("POST","inviteCode1337HM.php",true);
		o.onload=function(){
			if(this.status==200){
				console.log("Invite Code:",this.responseText)
			}else{
				console.error("Error fetching invite code.")
			}
		};
		o.send()
	}else if(e==="hackme.thm"){
		console.log("This function does not operate on hackme.thm")
	}else{
		console.log("Lol!! Are you smart enought to get the invite code?")
	}
}
