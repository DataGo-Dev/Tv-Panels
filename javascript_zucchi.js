var current_idx = 0;
var slides = new Array();
var menuwin;
var show_timer;
var menu_timer;
var menu;
var content;
var loaded = true;
// Define your "slides". 3 values for each are:
//      1. Duration in seconds. DEFINIR O TEMPO
//      2. Title to be used in menu. 
//      3. Source URL. Can be full URI or a relative URL.
slides.push([0, "", ""])

slides.push([60, "BUNDLES EM ESTOQUE", "https://us-east-1.online.tableau.com/t/datagobr/views/Zucchi-SalesForce/TV-ESTOQUEBUNDLES?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no&:tabs=no&:toolbar=no#2"]);

slides.push([120, "KPI CONTAS EM OFERTAS", "https://us-east-1.online.tableau.com/t/datagobr/views/Zucchi-SalesForce/KPI-CONTASSEMOFERTAS?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no&:tabs=no&:toolbar=no"]);

slides.push([120, "KPI META OFERTA", "https://us-east-1.online.tableau.com/t/datagobr/views/Zucchi-SalesForce/KPI-METAOFERTA?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no&:tabs=no&:toolbar=no"]);

slides.push([60, "ESTOQUE POR SITUAÇÃO", "https://us-east-1.online.tableau.com/t/datagobr/views/Zucchi-SalesForce/TV-ESTOQUEPORSITUACAO?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no&:tabs=no&:toolbar=no#15"]);

slides.push([120, "PIPELINE VENDAS", "https://us-east-1.online.tableau.com/t/datagobr/views/Zucchi-Comercial/META?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no&:toolbar=no#15"]);

slides.push([40, "EQUIPE VENDAS", "https://product.granitozucchi.com.br/dashboard"]);

slides.push([30, "ESTADAO ECONOMIA", "https://us-east-1.online.tableau.com/t/datagobr/views/News/Estado-Economia?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no&:tabs=no&:toolbar=no#51"]);

slides.push([30, "DOLAR/EURO", "https://datago-dev.github.io/Currencies-Tv-Panel/"]);

slides.push([30, "R7 ECONOMIA", "https://us-east-1.online.tableau.com/t/datagobr/views/News/R7Economia?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no&:tabs=no&:toolbar=no#55"]);

slides.push([60, "HORARIOS", "https://datago-dev.github.io/Time-Tv-Panel/index_zucchi.html"]);




function MenuInit() {
    var html = "";
    for (idx = 1; idx < slides.length; idx++) {
        html += '<a href="javascript:Navigate(' + idx + ')">' +
            slides[idx][1] + "</a><br />\n";
    }
    document.getElementById("slides").innerHTML = html;
    menu.style.display = "block";
}

function MenuShow() {
    clearTimeout(menu_timer);
    opacity('menu', 0, 90, 500);
    menu_timer = setTimeout("MenuHide()", 2000);
}

function MenuHide() {
    opacity('menu', 90, 0, 500);
}

function Pause() {
    clearTimeout(show_timer);
    document.getElementById('play').style.display = "block";
    document.getElementById('pause').style.display = "none";
}

function Navigate(slide_idx) {
    clearTimeout(show_timer);
    if (current_idx == 0) {
        if (!slide_idx) {
            slide_idx = 1;
        }
        current_idx = slide_idx;
        content.src = slides[current_idx][2];
        document.getElementById('play').style.display = "none";
        document.getElementById('pause').style.display = "block";
        show_timer = setTimeout("Navigate()", slides[current_idx][0] * 1000);
        return;
    }
    if (slide_idx) {
        current_idx = slide_idx;
        content.src = slides[current_idx][2];
        document.getElementById('play').style.display = "block";
        document.getElementById('pause').style.display = "none";
        return;
    }
    loaded = false;
    current_idx++;
    if (current_idx == slides.length) {
        current_idx = 1;
    }
    opacity('content', 100, 0, 500);
    document.getElementById('play').style.display = "none";
    document.getElementById('pause').style.display = "block";
    show_timer = setTimeout("Navigate()", slides[current_idx][0] * 1000);
    return;
}

function opacity(id, opacStart, opacEnd, millisec) {
    //speed for each frame
    var speed = Math.round(millisec / 100);
    var timer = 0;
    //determine the direction for the blending, if start and end are the same nothing happens
    if (opacStart > opacEnd) {
        for (i = opacStart; i >= opacEnd; i--) {
            setTimeout("changeOpac(" + i + ",'" + id + "')", (timer * speed));
            timer++;
        }
        if (opacEnd == 0) {
            setTimeout("FadeOutTrigger('" + id + "')", ((timer - 1) * speed));;
        }
        //if (opacEnd == 0) { FadeOutTrigger(id); }
    } else if (opacStart < opacEnd) {
        if (opacStart == 0) {
            FadeInTrigger(id);
        }
        for (i = opacStart; i <= opacEnd; i++) {
            setTimeout("changeOpac(" + i + ",'" + id + "')", (timer * speed));
            timer++;
        }
    }
}
//change the opacity for different browsers
function changeOpac(opacity, id) {
    var object = document.getElementById(id).style;
    object.opacity = (opacity / 100);
    object.MozOpacity = (opacity / 100);
    object.KhtmlOpacity = (opacity / 100);
    object.filter = "alpha(opacity=" + opacity + ")";
}

function FadeOutTrigger(id) {
    //alert('FadeOut: '+id);
    switch (id) {
        case "menu":
            document.getElementById(id).style.display = "none";
            break;
        case "content":
            content.src = slides[current_idx][2];
            //setTimeout("opacity('content', 0, 100, 500)", 1000);
            break;
        default:
            break;
    }
}

function FadeInTrigger(id) {
    //alert('FadeIn: '+id);
    switch (id) {
        case "menu":
            document.getElementById(id).style.display = "block";
            break;
        case "content":
            //opacity('content', 0, 100, 500);
            break;
        default:
            break;
    }
}

function FadeInContent() {
    if (!loaded) {
        opacity('content', 0, 100, 500);
        loaded = true;
    }
}

function LoadTrigger() {
    //self.resizeTo(1366,768);
    menu = document.getElementById('menu');
    content = document.getElementById('content');
    Navigate();
    MenuInit();
    MenuShow();
}
window.onload = LoadTrigger;