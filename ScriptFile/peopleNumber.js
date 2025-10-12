function initMap() {
    const apiKey = `48416253716b696d3236534a494971`;
    const month = `202503`; // 다른 날짜로 할 수 있지만 최근 날짜로 해서 유저가 예측할 수 있게 함
    const url = `http://openapi.seoul.go.kr:8088/${apiKey}/json/CardSubwayTime/1/1000/${month}/`;
    // 서울 공공데이터 사용

    fetch(url)
        .then(response => response.json())
        .then(json => parseJson(json))
        .catch(error => console.error("API 오류:", error));
}

function parseJson(json) {
    const hourInput = document.getElementById('time').value.trim().padStart(1, '0');  // 데이터를 보게 되면 오전의 경우 05, 06으로 되어 있음=> 유저가 입력할때 한자리수 입력을 할 수 있음
    // padstart 에서 (만들고 싶은 문자열, 앞에 채울 문자) 로 유저가 입력할때 5를 눌러도 -> 05 로 인식할 수 있게 함
    const subwayInput = document.getElementById('subway1').value.trim().replace(/역$/,'');  // 역까지 검색했을 경우 현재 json 데이터에는 역이 없기 때문에 역을 제거해줌
    const hourKey = `HR_${hourInput}_GET_ON_NOPE`;   // 승차 시간
    const hourKeyOff = `HR_${hourInput}_GET_OFF_NOPE`; // 하차 시간
    const rows = json.CardSubwayTime?.row;
    // const rows = json.CardSubwayTime?.row || []; 맨 뒤에 빈 배열을 둬서 undefined 일 경우를 대비 할 수 있지만 일단 스킵


    const table = [];
    table.push(`<tr><th>호선</th><th>역 이름</th><th>${hourInput}시 승차</th><th>${hourInput}시 하차</th></tr>`);

    for (const e of rows) {
        const station = e.STTN || '';  // 만약 열차의 이름이 없을 경우 빈 열 처리
        const line = e.SBWY_ROUT_LN_NM || '';
        const getOn = e[hourKey] || 0;
        const getOff = e[hourKeyOff] || 0;

        if (station.includes(subwayInput)){
            const onStyle = getOn > 60000 ? 'style="color:red; font-weight:bold;"' :  'style="color:green;font-weight:bold;"';
            const offtyle = getOff > 60000 ? 'style="color:red; font-weight:bold;"' :  'style="color:green;font-weight:bold;"';
            // 기준이 굉장히 애매 함. 사당역 출근 시간 기준으로 8시 승차가 10만명, 하차가 7만명이라서 지하철 내부가 안 차려면은 5~6만여명이 적당하게 생각


        if (station.includes(subwayInput)) {  // 지하철 혼잡도 표 만들기
            table.push(`
                    <tr>
                        <td>${line}</td>
                        <td>${station}</td>
                        <td ${onStyle}>${getOn}</td>
                        <td ${offtyle}>${getOff}</td>
                       
                    </tr>
                `);

        }
        }
    }

    if (table.length === 1) {  // 만약 테이블 내의 데이터를 검색했을때 table 내에 어떤 요소도 추가 되지 않은 상태이면 밑의 코드를 집어 넣기
        table.push(`<tr><td colspan="4">해당 조건의 데이터가 없습니다.</td></tr>`);
        // colspan 은 테이블 내에 하나의 값만을 넣고 싶을 때 사용함= > 내용이 아무것도 없을 때 사용하기 적합
    }

    document.getElementById('demoJSON').innerHTML = table.join('');

}