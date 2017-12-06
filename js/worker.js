function createWorker(){
    if (window.Worker) { // Check if Browser supports the Worker api.
    	// Requires script name as input
    	var myWorker = new Worker("js/notifications.js");
    	myWorker.onmessage = function(e) {
            console.log(e.data);
    	};
    }
}
