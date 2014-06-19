function DataItem(data,db) {
  this.setData(data,db)
}
DataItem.prototype = {
     data: {},
     setData: function(data,db){
       this.data = data;
       var dbObj = new DbManager(db);
       dbObj.store(data);
    },
    getData:function(){
    	return this.data;
    }
 }

function DbManager(dbName){
	this.db = dbName;
}
DbManager.prototype = {
	store:function(data){
		this.keyCount();
		var dataString = JSON.stringify(data);
		this.db.setItem(data.key,dataString);
	},

keyCount:function(){
 
 var itemsInDb = this.getItemFromDb();
 var key;
 var length = itemsInDb.length;
 if(length===0){

 	key=0
 }
 else {
 	key = itemsInDb[length-1].key + 1;
 }
 return key;

},
getItemFromDb:function(){
	var tempArray = [];
	var dataBase = this.db;
	for(var i in dataBase) {
		dataObj = JSON.parse(dataBase[i]);
		tempArray.push(dataObj);
	}
	tempArray.sort(function(a,b){
		return a.key-b.key;
	})
	return tempArray;
  },
  removeItemFromDb: function(key) {
		this.db.removeItem(key);
	},
  changeDbItemStatus: function(key, className) {
		var clone = this.db[key];
		var b = JSON.parse(clone);
		b.class = className;
		var c = JSON.stringify(b);
		this.db.setItem(key, c);
	},
	changeDb: function(key,className){

		var clone = this.db[key];
		var a = JSON.parse(clone);
		a.un = className;
		var d = JSON.stringify(a);
		this.db.setItem(key,d);


	}
}