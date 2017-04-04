export function updateDB(params){
	let xhr = new XMLHttpRequest();
		xhr.open('POST', '/api/data/vote', true);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		/*xhr.onload = function(){
			if(xhr.status == 200){
				console.log('data sent to server');
			}
		};*/
		xhr.send(params);
}

export function queryDB(username,pollid){	
	return new Promise(function(resolve,reject){
		
		let url, params;

		if(username || username === ''){			
				params = `username=${username}`;
				url = `/api/data/user?${params}`;			
		}

		if(pollid){
			params = `pollid=${pollid}`;
			url = `/api/data/pollid?${params}`;			
		}

		let xhr = new XMLHttpRequest();

			xhr.open('GET',url, true);

			xhr.onload = function(){
				if(xhr.status == 200){					
					resolve(JSON.parse(xhr.responseText));
				}else{
					reject(Error(xhr.statusText));
				}
			};
			xhr.send();
	});
}

export function deletePoll(pollname){
	return new Promise((resolve,reject)=>{
		let params = `pollname=${pollname}`;
		let xhr = new XMLHttpRequest();
		
		xhr.open('POST','/deletepoll', true);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.onload = function(){
			if(xhr.status === 200){
				resolve('Poll deleted');
			}else{
				reject('error in deleting poll');
			}
		};
		xhr.send(params);
	});
}