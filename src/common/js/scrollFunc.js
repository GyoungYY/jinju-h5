let timer = null;
let scrollFunc = {
    gotoTop() {
        cancelAnimationFrame(timer);
        timer = requestAnimationFrame(function fn() {
            var oTop =
                document.body.scrollTop || document.documentElement.scrollTop;
            if (oTop > 0) {
                scrollTo(0, oTop - 50);
                timer = requestAnimationFrame(fn);
            } else {
                cancelAnimationFrame(timer);
            }
        });
    }
}

export default scrollFunc;