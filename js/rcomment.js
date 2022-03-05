    ! function (e, t, n) {
        "use strict";
        // var i, a = (i = n(4)) && i.__esModule ? i : {
        //     default: i
        // };
        e.exports = function (e) {
            ! function (e) {
                var t = document.querySelector(".leancloud-recent-comment");
                function renderTime(date) {
                    let myDate = new Date(date).toJSON();
                    return new Date(+new Date(myDate) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
                }
                function formatTime(time) {
                    let d = Math.floor(time / (1000 * 60 * 60 * 24));
                    let h = Math.floor(time / (1000 * 60 * 60) % 24);
                    let m = Math.floor(time / (1000 * 60) % 60);
                    let s = Math.floor(time / 1000 % 60);
                    if (d > 0) {
                        return d + ' 天前'
                    } else if (h > 0) {
                        return h + ' 小时前'
                    } else if (m > 0) {
                        return m + ' 分钟前'
                    } else if (s > 0) {
                        return s + ' 秒钟前'
                    }

                }
                let str = ' @ '
                let reg = /<.*?>/ig;
                let date = new Date()
                var t = document.querySelector(".leancloud-recent-comment");
                t && !t.classList.contains("loaded") && fetch('https://waline-wakabayu.vercel.app/comment?type=recent&count=')
                    .then(response => response.json())
                    .then(data => {
                        let arr = data.filter(item => item.mail !== "7393ce11f9eb873b79ac6a74c39f8eca" && item.pid === undefined)
                        arr.splice(10);
                        let i = arr.length
                        for (var r = "", o = 0; o < i; o++) {
                            let comment = arr[o].comment.replace(reg, '');
                            let gap = formatTime(date - new Date(renderTime(arr[o].createdAt)))
                            r += `<li class="item"><a href="${arr[o].url + '#' + arr[o].objectId}">
                                <span class="breadcrumb">${arr[o].nick + str + gap}</span>
                                <span>${comment}</span></a></li>`;
                            t.innerHTML = r, t.classList.add("loaded"), e.config.pjax && e.config.pjax.refresh(t)
                        }
                    })
                    .catch(console.error)
            }(e)
        }
    }