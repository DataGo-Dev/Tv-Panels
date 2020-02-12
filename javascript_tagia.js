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
slides[1] = new Array(30, "Metas Volda", "https://us-east-1.online.tableau.com/t/datagobr/views/Tagia-Metas/METAS-VOLDA?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no&:tabs=no&:toolbar=no#");


slides[2] = new Array(60, "Metas", "https://us-east-1.online.tableau.com/t/datagobr/views/Tagia-Metas/FATURAMENTOMOBILE?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no&:tabs=no&:toolbar=no#");

slides[3] = new Array(60, "Cotação", "https://luanh-s.github.io/Currencies/");


slides[4] = new Array(20, "FolhaSP", "https://us-east-1.online.tableau.com/t/datagobr/views/News/FolhaSP?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no&:tabs=no&:toolbar=no#");


slides[5] = new Array(40, "Tecmundo Mercado", "https://us-east-1.online.tableau.com/t/datagobr/views/News/TecMundo-Mercado?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no&:tabs=no&:toolbar=no#");

slides[6] = new Array(40, "Tempo Local", "https://luanh-s.github.io/TimeandDate/");


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