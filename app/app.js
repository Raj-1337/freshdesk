$(document).ready(function () {
    app.initialized()
        .then(function (_client) {
            var client = _client;
            client.events.on('app.activated',
                function () {
                    let city = '';
                    let pkey = 'f55ed09f337fd80803511ee89c51d9c3';
                    let days = { 1: null, 2: null, 3: null, 4: null, 5: null }

                    $(document).ready(function () {
                        $('#btn').click(function () {
                            city = $('#city').val();
                            $.ajax({
                                type: "post",
                                url: `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=Metric&appid=${pkey}`,
                                success: function (result) {
                                    $('#displayWeather').css("display", "flex")
                                    let i = 2;
                                    let dts = '';
                                    for (const key in result.list) {
                                        let obj = {};
                                        const element = result.list[key];
                                        let dt = element.dt_txt;
                                        dt = dt.split(" ");
                                        obj.tmp_min = element.main.temp_min;
                                        obj.tmp_max = element.main.temp_max;
                                        obj.wind = (element.wind.speed).toFixed(2);
                                        obj.date = dt;
                                        if (key === "0") {
                                            days[1] = obj;
                                            dts = obj.date["0"];
                                        }
                                        else if (dt[1] === "00:00:00" && dt[0] != dts) {
                                            days[i] = obj;
                                            i += 1;
                                        }
                                    }
                                    console.log("let's see.....");
                                    // for (const i in days) {
                                    //     const element = days[i];
                                    //     console.log(element);
                                    // }
                                    function dtt(x) {
                                        let t = x.date[0];
                                        return t.slice(length - 2);
                                    };
                                    days.city = city;
                                    $('#local').text(days.city);
                                    $('#windSpeedHtml').text(days[1].wind);
                                    $('#tempCurrentMax').text(days[1].tmp_max);
                                    $('#tempCurrentMin').text(days[1].tmp_min);
                                    $('#day1').text(dtt(days[2]));
                                    $('#day2').text(dtt(days[3]));
                                    $('#day3').text(dtt(days[4]));
                                    $('#day4').text(dtt(days[5]));
                                    $('#day5').text(dtt(days[6]));
                                    $('#btn1').click(function () {
                                        $('#windSpeedHtml').text(days[2].wind);
                                        $('#tempCurrentMax').text(days[2].tmp_max);
                                        $('#tempCurrentMin').text(days[2].tmp_min);
                                    });
                                    $('#btn2').click(function () {
                                        $('#windSpeedHtml').text(days[3].wind);
                                        $('#tempCurrentMax').text(days[3].tmp_max);
                                        $('#tempCurrentMin').text(days[3].tmp_min);
                                    });
                                    $('#btn3').click(function () {
                                        $('#windSpeedHtml').text(days[4].wind);
                                        $('#tempCurrentMax').text(days[4].tmp_max);
                                        $('#tempCurrentMin').text(days[4].tmp_min);
                                    });
                                    $('#btn4').click(function () {
                                        $('#windSpeedHtml').text(days[5].wind);
                                        $('#tempCurrentMax').text(days[5].tmp_max);
                                        $('#tempCurrentMin').text(days[5].tmp_min);
                                    });
                                    $('#btn5').click(function () {
                                        $('#windSpeedHtml').text(days[6].wind);
                                        $('#tempCurrentMax').text(days[6].tmp_max);
                                        $('#tempCurrentMin').text(days[6].tmp_min);
                                    });
                                    // localStorage.setItem("previous", JSON.stringify(days));
                                    try {
                                        let pre = JSON.parse(localStorage.getItem("previous"));
                                        if (pre.cnt < 5) {
                                            let i = pre.cnt + 1;
                                            pre[i] = {
                                                name: city,
                                                temp_max: days[1].tmp_max,
                                                temp_min: days[1].tmp_min,
                                                wind: days[1].wind
                                            };
                                            pre.cnt += 1;
                                            localStorage.setItem("previous", JSON.stringify(pre));
                                        }
                                        else {
                                            let i = 0;
                                            for (i = 2; i < 6; i++) {
                                                pre[i - 1] = JSON.parse(JSON.stringify(pre[i]));
                                            }
                                            pre[5].name = city;
                                            pre[5].temp_max = days[1].tmp_max;
                                            pre[5].temp_min = days[1].tmp_min;
                                            pre[5].wind = days[1].wind;
                                            localStorage.setItem("previous", JSON.stringify(pre));
                                        }
                                    } catch (error) {
                                        prev = {
                                            cnt: 1
                                        };
                                        obj = {
                                            name: city,
                                            temp_max: days[1].tmp_max,
                                            temp_min: days[1].tmp_min,
                                            wind: days[1].wind
                                        };
                                        prev[1] = obj;
                                        localStorage.setItem("previous", JSON.stringify(prev));
                                    }
                                }
                            });
                            $('#prv').click(function () {
                                let pre = JSON.parse(localStorage.getItem("previous"));
                                console.log("searching previous records now");
                                console.log(pre);
                                $('#previous').css("display", "flex");
                                for (i in pre) {
                                    if (i != "cnt") {
                                        let elmnt = `<div class="cxx">   
                                      <div class="cx">
                                        <i class="fas fa-map-marker-alt"></i>
                                        <span id="">${pre[i].name}</span>
                                      </div>
                                      <div class="cx">
                                        <i class="fas fa-temperature-high"></i>
                                        <span><span id="">${pre[i].temp_max}</span> &deg;c</span>
                                      </div>
                                      <div class="cx">
                                        <i class="fas fa-temperature-low"></i>
                                        <span><span id="">${pre[i].temp_min}</span> &deg;c</span>
                                      </div>
                                      <div class="cx">
                                        <i class="fas fa-wind"></i>
                                        <span><span id="">${pre[i].wind}</span> m/s</span>
                                      </div></div>`;
                                        $('#previous').append(elmnt);
                                    }
                                }
                            });
                        });
                    });
                });
        });
});
