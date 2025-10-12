const api = `48416253716b696d3236534a494971`;
const url = `http://openapi.seoul.go.kr:8088/${api}/json/SmrtEmergerncyGuideImg/1/1000/`;

function loadToiletInfoMAP() {
    const stationName = document.getElementById('row').value.trim();
    const mapDiv = document.getElementById('map');
    mapDiv.innerHTML = '';

 fetch(url)
     .then(res => res.json())
    .then(data => {
        const rows = data.SmrtEmergerncyGuideImg.row;  // 정보 가져오기
        const result = rows.filter(e=> e.STTN.includes(stationName))

        result.forEach(e => {
            const img = document.createElement("img");  // 새로운 이미지 요소 생성
            img.src = e.IMG_LINK;
            img.alt = `${e.STTN	}`
            img.style.width = '700px';
            img.style.height = '800px';
            mapDiv.appendChild(img); // mapDiv 에 img 자식 추가 하기
        })
    })
    .catch(err => console.log(err));
}
function removeTable() {
    document.getElementById("map").innerHTML = "";
    document.getElementById("demoJSON").innerHTML = "";
}
