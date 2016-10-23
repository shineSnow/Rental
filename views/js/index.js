(function(){
	function getInfosSuc(data){
		var params = data.params;
		for(var url in params){
			var localSearch = new BMap.LocalSearch(map);
			localSearch.setSearchCompleteCallback(function (searchResult) {
				var poi = searchResult.getPoi(0);/*地理位置信息*/
				console.log(poi)
				var point = new BMap.Point(poi.point.lng,poi.point.lat);

				var myIcon = new BMap.Icon("../image/house.png", new BMap.Size(30, 30), {});      
				// 创建标注对象并添加到地图   
				var marker = new BMap.Marker(point, {icon: myIcon});    
				map.addOverlay(marker);    

				marker.addEventListener("click", function(){    
				 	window.location.href = url; 
				});

		　　});
			localSearch.search(params[url].location);
		}
	}

	function getInfosErr(e){
		alert('获取数据失败');
	}

	var map = new BMap.Map("container");          // 创建地图实例  
	map.centerAndZoom("杭州", 12);
	map.enableScrollWheelZoom();   //启用滚轮放大缩小，默认禁用
	map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用
	
	$.ajax({
		'type': 'post',
		'url': '/rental/getInfos',
		'contentType': 'application/json;charset=utf-8',
		'data': JSON.stringify({params: null}),
		success: getInfosSuc ,
		async: true,
		error: getInfosErr ,
	})

	
})();