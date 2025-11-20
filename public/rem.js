if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    function setRemUnit() {
        const viewWidth = document.documentElement.clientWidth || document.body.clientWidth;
        const designWidth = viewWidth > 768 ? 1512 : 768;
        const baseFontSize = (viewWidth / designWidth) * (viewWidth > 768 ? 10 : 16);

        // ✅ 更新 CSS 变量，而不是直接改 style
        document.documentElement.style.setProperty("--rem-base", baseFontSize + "px");
    }

    setRemUnit();
    window.addEventListener("resize", setRemUnit);
    window.addEventListener("orientationchange", setRemUnit);
}