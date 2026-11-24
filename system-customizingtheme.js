// ==UserScript==
// @name         Acumatica Live: [*] - FLexxon Theme (Customizable)
// @namespace    https://github.com/flexxonwebapps
// @version      26.1124.1
// @description  Replace system color with Flexxon logo and defaulted as purple theme, but it is customizable.
// @author       Martin M
// @match        https://flexxonlive.go.akamai-access.com/FlexxonLive/*
// @icon         https://www.flexxon.com/wp-content/uploads/2021/04/cropped-Favicon-1-1.ico
// @updateURL    https://raw.githubusercontent.com/flexxonwebapps/userscript/main/bundle.user.sub.js
// @downloadURL  https://raw.githubusercontent.com/flexxonwebapps/userscript/main/bundle.user.sub.js
// @grant        none
// ==/UserScript==


//Check Color Site::  https://www.w3schools.com/tags/ref_colornames.asp
//========================================================================
var $colorSetting = {
//========================================================================
//========================================================================

	/* Top Menu */
	main: 'RebeccaPurple',
	mainhoverdark: 'Indigo',
	mainhoverbright: 'DarkViolet',
	mainpressed: 'MediumPurple',
	mainhoverpressed: 'BlueViolet',
	topmenubackground: 'Lavender',
	branchnamehoverbackground: 'MediumSlateBlue',
	profilebuttonbackground: 'SlateBlue',
	profilebuttonhoverbackground: 'DarkSlateBlue',
	logoutbuttonbackground: 'red',
	logoutbuttonhoverbackground: 'FireBrick',
	logobackground: 'Lavender',
	logohoverbackground: 'MediumOrchid',
	iconbackground: 'DarkMagenta',
	iconhoverbackground: 'BlueViolet',

	/* Side Menu */
	sidebackground: 'MediumPurple',
	sidebuttonbackground: 'Indigo',
	sidebuttonicon: 'pink',
	sidebuttontext: 'yellow',
	sidehoverbuttonbackground: 'IndianRed',
	sidehoverbuttonicon: 'yellow',
	sidehoverbuttontext: 'LavenderBlush',
	sidepressedbuttonbackground: 'DarkCyan',
	sidepressedbuttonicon: 'gold',
	sidepressedbuttontext: 'white',
	sidehidebuttontext: 'Gainsboro',
	sidehoverhidebuttonbackground: 'MediumOrchid',
	sidehoverhidebuttontext: 'yellow',

    /* Left Side Open Menu */
    popupmenubackground: 'HoneyDew',
    popupmenutitlebackground: 'Seagreen',
    popupmenutitletext: 'white',
    popupmenuhovertitlebackground: 'green',
    popupmenuhovertitletext: 'yellow',
    popupmenutopbuttonbackground: '#009999',
    popupmenutopbuttontext: 'white',
    popupmenuhovertopbuttonbackground: '#33cccc',
    popupmenuhovertopbuttontext: 'blue',
    popupmenuprimarysectiontitlebackground: '#ddd',
    popupmenuprimarysectiontitletext: 'black',
    popupmenuprimarysectionbackground: '#eee',
    popupmenuprimarysectiontext: 'DarkBlue',
    popupmenuhoverprimarysectionbackground: 'CadetBlue',
    popupmenuhoverprimarysectiontext: 'yellow',
    popupmenuprimaryliststar: 'red',
    popupmenuhoverprimaryliststar: 'gold',
    popupmenudisplayallbuttonbackground: '#F5F5DC',

    /* Left Side Open Menu > More Items */
    popupmoreitemtitlebackground: 'DarkSeaGreen',
    popupmoreitembuttonbackground: 'SeaGreen',
    popupmoreitembuttontext: '#ddd',
    popupmoreitembuttonicon: 'lime',
    popupmoreitemhoverbuttonbackground: 'ForestGreen',
    popupmoreitemhoverbuttontext: 'white',
    popupmoreitemhoverbuttonicon: 'yellow',

    /* Main Frame */
    mainframeborder: 'silver',
    rightmenubackground: 'AliceBlue',
    rightmenubuttonbackground: 'AliceBlue',
    rightmenubuttontext: 'red',
    rightmenubuttonicon: 'blue',
    rightmenuhoverbuttonbackground: 'RoyalBlue',
    rightmenuhoverbuttontext: 'white',
    rightmenuhoverbuttonicon: 'yellow',
    rightmenupressedbuttonbackground: 'PaleTurquoise',
    rightmenutogglebuttonbackground: 'AliceBlue',
    rightmenuhovertogglebuttonbackground: 'PowderBlue',

//========================================================================
//========================================================================
};
//============================================================
//============================================================
//============================================================
//============================================================
//***************🔻Do Not Edit Below Scripts🔻***************
//============================================================
//============================================================
//============================================================
//============================================================
(function(){
    'use strict';
    if(window.top == window.self){
        var s = '', opts = $colorSetting;

        s+=' :root { ';
        /* Top Menu */
        s+=' --main: '+opts.main+'; ';
        s+=' --mainhoverdark: '+opts.mainhoverdark+'; ';
        s+=' --mainhoverbright: '+opts.mainhoverbright+'; ';
        s+=' --mainpressed: '+opts.mainpressed+'; ';
        s+=' --mainhoverpressed: '+opts.mainhoverpressed+'; ';
        s+=' --topmenubackground: '+opts.topmenubackground+'; ';
        s+=' --branchnamehoverbackground: '+opts.branchnamehoverbackground+'; ';
        s+=' --profilebuttonbackground: '+opts.profilebuttonbackground+'; ';
        s+=' --profilebuttonhoverbackground: '+opts.profilebuttonhoverbackground+'; ';
        s+=' --logoutbuttonbackground: '+opts.logoutbuttonbackground+'; ';
        s+=' --logoutbuttonhoverbackground: '+opts.logoutbuttonhoverbackground+'; ';
        s+=' --logobackground: '+opts.logobackground+'; ';
        s+=' --logohoverbackground: '+opts.logohoverbackground+'; ';
        s+=' --iconbackground: '+opts.iconbackground+'; ';
        s+=' --iconhoverbackground: '+opts.iconhoverbackground+'; ';

        /* Left Side Menu */
        s+=' --sidebackground: '+opts.sidebackground+'; ';
        s+=' --sidebuttonbackground: '+opts.sidebuttonbackground+'; ';
        s+=' --sidebuttonicon: '+opts.sidebuttonicon+'; ';
        s+=' --sidebuttontext: '+opts.sidebuttontext+'; ';
        s+=' --sidehoverbuttonbackground: '+opts.sidehoverbuttonbackground+'; ';
        s+=' --sidehoverbuttonicon: '+opts.sidehoverbuttonicon+'; ';
        s+=' --sidehoverbuttontext: '+opts.sidehoverbuttontext+'; ';
        s+=' --sidepressedbuttonbackground: '+opts.sidepressedbuttonbackground+'; ';
        s+=' --sidepressedbuttonicon: '+opts.sidepressedbuttonicon+'; ';
        s+=' --sidepressedbuttontext: '+opts.sidepressedbuttontext+'; ';
        s+=' --sidehidebuttontext: '+opts.sidehidebuttontext+'; ';
        s+=' --sidehoverhidebuttonbackground: '+opts.sidehoverhidebuttonbackground+' ';
        s+=' --sidehoverhidebuttontext: '+opts.sidehoverhidebuttontext+'; ';

        /* Left Side Open Menu */
        s+=' --popupmenubackground: '+opts.popupmenubackground+'; ';
        s+=' --popupmenutitlebackground: '+opts.popupmenutitlebackground+'; ';
        s+=' --popupmenutitletext: '+opts.popupmenutitletext+'; ';
        s+=' --popupmenuhovertitlebackground: '+opts.popupmenuhovertitlebackground+'; ';
        s+=' --popupmenuhovertitletext: '+opts.popupmenuhovertitletext+'; ';
        s+=' --popupmenutopbuttonbackground: '+opts.popupmenutopbuttonbackground+'; ';
        s+=' --popupmenutopbuttontext: '+opts.popupmenutopbuttontext+'; ';
        s+=' --popupmenuhovertopbuttonbackground: '+opts.popupmenuhovertopbuttonbackground+'; ';
        s+=' --popupmenuhovertopbuttontext: '+opts.popupmenuhovertopbuttontext+'; ';
        s+=' --popupmenuprimarysectiontitlebackground: '+opts.popupmenuprimarysectiontitlebackground+'; ';
        s+=' --popupmenuprimarysectiontitletext: '+opts.popupmenuprimarysectiontitletext+'; ';
        s+=' --popupmenuprimarysectionbackground: '+opts.popupmenuprimarysectionbackground+'; ';
        s+=' --popupmenuprimarysectiontext: '+opts.popupmenuprimarysectiontext+'; ';
        s+=' --popupmenuhoverprimarysectionbackground: '+opts.popupmenuhoverprimarysectionbackground+'; ';
        s+=' --popupmenuhoverprimarysectiontext: '+opts.popupmenuhoverprimarysectiontext+'; ';
        s+=' --popupmenuprimaryliststar: '+opts.popupmenuprimaryliststar+'; ';
        s+=' --popupmenuhoverprimaryliststar: '+opts.popupmenuhoverprimaryliststar+'; ';
        s+=' --popupmenudisplayallbuttonbackground: '+opts.popupmenudisplayallbuttonbackground+'; ';

        /* Left Side Open Menu > More Items */
        s+=' --popupmoreitemtitlebackground: '+opts.popupmoreitemtitlebackground+'; ';
        s+=' --popupmoreitembuttonbackground: '+opts.popupmoreitembuttonbackground+'; ';
        s+=' --popupmoreitembuttontext: '+opts.popupmoreitembuttontext+'; ';
        s+=' --popupmoreitembuttonicon: '+opts.popupmoreitembuttonicon+'; ';
        s+=' --popupmoreitemhoverbuttonbackground: '+opts.popupmoreitemhoverbuttonbackground+'; ';
        s+=' --popupmoreitemhoverbuttontext: '+opts.popupmoreitemhoverbuttontext+'; ';
        s+=' --popupmoreitemhoverbuttonicon: '+opts.popupmoreitemhoverbuttonicon+'; ';

        /* Main Frame */
        s+=' --mainframeborder: '+opts.mainframeborder+'; ';
        s+=' --rightmenubackground: '+opts.rightmenubackground+'; ';
        s+=' --rightmenubuttonbackground: '+opts.rightmenubuttonbackground+'; ';
        s+=' --rightmenubuttontext: '+opts.rightmenubuttontext+'; ';
        s+=' --rightmenubuttonicon: '+opts.rightmenubuttonicon+'; ';
        s+=' --rightmenuhoverbuttonbackground: '+opts.rightmenuhoverbuttonbackground+'; ';
        s+=' --rightmenuhoverbuttontext: '+opts.rightmenuhoverbuttontext+'; ';
        s+=' --rightmenuhoverbuttonicon: '+opts.rightmenuhoverbuttonicon+'; ';
        s+=' --rightmenupressedbuttonbackground: '+opts.rightmenupressedbuttonbackground+'; ';
        s+=' --rightmenutogglebuttonbackground: '+opts.rightmenutogglebuttonbackground+'; ';
        s+=' --rightmenuhovertogglebuttonbackground: '+opts.rightmenuhovertogglebuttonbackground+'; ';

        s+=' } ';




        /* =============== */
        /* === Top Bar === */
        /* =============== */

        s += ' form div.navbar.master { ';
        s += '   background-color: var(--main); ';
        s += ' } ';


        s += ' form div#navBarMaster li.logo-button { ';
        s += '   background: var(--logobackground); ';
        s += '   border-width: 2px 1px 1px 2px; ';
        s += '   border-color: var(--main); ';
        s += '   border-style: solid; ';
        s += ' } ';
        s += ' form div#navBarMaster li.logo-button:hover { ';
        s += '   background:var(--logohoverbackground); ';
        s += ' } ';
        s += ' form div#navBarMaster.min li.logo-button { ';
        s += '   background:var(--iconbackground); ';
        s += ' } ';
        s += ' form div#navBarMaster.min li.logo-button:hover { ';
        s += '   background:var(--iconhoverbackground); ';
        s += ' } ';
        s += ' form div#navBarMaster li.logo-button a#linkLogo { ';
        s += '   background: url(https://lh3.googleusercontent.com/lKOjZ7uX2_BLJHB_E7Uvccbx_hmJW776bG4yrMX0eE9opFLR0VQu_cE7_HC-eMuWC7ryqH-_HmmxPJgWkVlYtl4JJbqHQt0CE8FJEzwhKAUpGLUmZCBy8Dhh-lQN6LyM7LEwZQSJKg) no-repeat center center/contain; ';
        s += ' } ';
        s += ' form div#navBarMaster li.logo-button a#linkLogo img { ';
        s += '   display:none; ';
        s += ' } ';


        s += ' form div.navbar.master div.navbar-form { ';
        s += '   background: var(--main); ';
        s += '   height:100%; ';
        s += ' } ';
        s += ' form div.navbar.master div.navbar-form:hover { ';
        s += '   background: var(--mainhoverdark); ';
        s += ' } ';
        s += ' form div.navbar.master li#history-control.help-button { ';
        s += '   background: var(--main); ';
        s += ' } ';
        s += ' form div.navbar.master li#history-control.help-button:hover { ';
        s += '   background: var(--mainhoverbright); ';
        s += ' } ';


        s += ' form div.navbar.master li#branch-selector { ';
        s += '   background: var(--main); ';
        s += ' } ';
        s += ' form div.navbar.master li#branch-selector:hover { ';
        s += '   background: var(--mainhoverbright); ';
        s += ' } ';
        s += ' form div.navbar.master ul.navbar-nav li#branch-selector.open a.dropdown-toggle { ';
        s += '   background: var(--mainpressed) !important; ';
        s += ' } ';
        s += ' form div.navbar.master ul.navbar-nav li#branch-selector.open a.dropdown-toggle:hover { ';
        s += '   background: var(--mainhoverpressed) !important; ';
        s += ' } ';
        s += ' form div.navbar.master ul.navbar-nav li#branch-selector.open div.branch-selector__selector { ';
        s += '   background: var(--topmenubackground); ';
        s += ' } ';
        s += ' form div.navbar.master ul.navbar-nav li#branch-selector.open div.branch-selector__selector div.highlight { ';
        s += '   background: var(--branchnamehoverbackground); ';
        s += ' } ';


        s += ' form div.navbar.master li.bd-button { ';
        s += '   background: var(--main); ';
        s += ' } ';
        s += ' form div.navbar.master li.bd-button:hover { ';
        s += '   background: var(--mainhoverdark); ';
        s += ' } ';


        s += ' form div.navbar.master li.help-button { ';
        s += '   background: var(--main); ';
        s += ' } ';
        s += ' form div.navbar.master li.help-button:hover { ';
        s += '   background: var(--mainhoverbright); ';
        s += ' } ';


        s += ' form div.navbar.master a#btnUserMenu { ';
        s += '   background: var(--main) !important; ';
        s += ' } ';
        s += ' form div.navbar.master a#btnUserMenu:hover { ';
        s += '   background: var(--mainhoverbright) !important; ';
        s += ' } ';
        s += ' form div.navbar.master li.open a#btnUserMenu { ';
        s += '   background: var(--mainpressed) !important; ';
        s += ' } ';
        s += ' form div.navbar.master li.open a#btnUserMenu:hover { ';
        s += '   background: var(--mainhoverpressed) !important; ';
        s += ' } ';


        s += ' ul#userMenu.dropdown-menu { ';
        s += '   background: var(--topmenubackground); ';
        s += ' } ';
        s += ' ul#userMenu.dropdown-menu li.menu-form button#btnUserProfile { ';
        s += '   background: var(--profilebuttonbackground); ';
        s += '   color: white; ';
        s += ' } ';
        s += ' ul#userMenu.dropdown-menu li.menu-form button#btnUserProfile:hover { ';
        s += '   background: var(--profilebuttonhoverbackground); ';
        s += ' } ';
        s += ' ul#userMenu.dropdown-menu li.menu-form button#btnSignOut { ';
        s += '   background: var(--logoutbuttonbackground); ';
        s += '   color: white; ';
        s += ' } ';
        s += ' ul#userMenu.dropdown-menu li.menu-form button#btnSignOut:hover { ';
        s += '   background: var(--logoutbuttonhoverbackground); ';
        s += ' } ';


        /* ================= */
        /* === Left Menu === */
        /* ================= */

        s += ' div#leftMenuW, div#leftMenuW div.sized-menu { ';
        s += '   background: var(--sidebackground); ';
        s += ' } ';


        s += ' div#leftColumn div.list-group-item { ';
        s += '   background: var(--sidebuttonbackground) !important; ';
        s += '   border-top: 1px solid #fff; ';
        s += '   border-bottom: 1px solid #fff; ';
        s += '   margin-bottom:-1px; ';
        s += ' } ';
        s += ' div#leftColumn div.list-group-item i,  div.list-group-item svg { ';
        s += '   color: var(--sidebuttonicon) !important; ';
        s += ' } ';
        s += ' div#leftColumn div.list-group-item span { ';
        s += '   color: var(--sidebuttontext) !important; ';
        s += ' } ';


        s += ' div#leftColumn div.list-group-item:hover { ';
        s += '   background: var(--sidehoverbuttonbackground) !important; ';
        s += ' } ';
        s += ' div#leftColumn div.list-group-item:hover i, div.list-group-item:hover svg { ';
        s += '   color: var(--sidehoverbuttonicon) !important; ';
        s += ' } ';
        s += ' div#leftColumn div.list-group-item:hover span { ';
        s += '   color: var(--sidehoverbuttontext) !important; ';
        s += ' } ';


        s += ' div#leftColumn div.list-group-item.active { ';
        s += '     background: var(--sidepressedbuttonbackground) !important; ';
        s += ' } ';
        s += ' div#leftColumn div.list-group-item.active i, div.list-group-item.active svg { ';
        s += '   color: var(--sidepressedbuttonicon) !important; ';
        s += '   padding: 2px 0px 0px; ';
        s += ' } ';
        s += ' div#leftColumn div.list-group-item.active span { ';
        s += '   color: var(--sidepressedbuttontext) !important; ';
        s += '   padding: 0px 0px 2px; ';
        s += ' } ';
        s += ' div.list-group-item.active:hover { ';
        s += '   opacity:0.6; ';
        s += ' } ';


        s += ' div#leftColumn div#leftFooter { ';
        s += '   background:var(--sidebackground); ';
        s += '   border-top:1px solid #ccc; ';
        s += ' } ';
        s += ' div#leftColumn div#leftFooter i#btnMinLeftMenu { ';
        s += '   color: var(--sidehidebuttontext); ';
        s += ' } ';
        s += ' div#leftColumn div#leftFooter:hover { ';
        s += '   background: var(--sidehoverhidebuttonbackground); ';
        s += ' } ';
        s += ' div#leftColumn div#leftFooter:hover i#btnMinLeftMenu { ';
        s += '   color: var(--sidehoverhidebuttontext); ';
        s += ' } ';


        /* ================= */
        /* === Open Menu === */
        /* ================= */

        s += ' div#navMenu.nav-menu { ';
        s += '   background:  var(--popupmenubackground); ';
        s += ' } ';
        s += ' div#moduleName { ';
        s += '   position: relative; ';
        s += '   background:  var(--popupmenubackground); ';
        s += '   padding-top: 10px; ';
        s += '   margin-left:-20px; ';
        s += '   z-index:120; ';
        s += ' } ';
        s += ' div#moduleName div.module-text { ';
        s += '   font-family: arial black; ';
        s += '   background:  var(--popupmenutitlebackground); ';
        s += '   padding-left: 10px; ';
        s += '   padding-bottom: 4px; ';
        s += ' } ';
        s += ' div#moduleName  div.module-text span.text { ';
        s += '   color: var(--popupmenutitletext); ';
        s += ' } ';
        s += ' div#moduleName div.module-text:hover { ';
        s += '   background: var(--popupmenuhovertitlebackground); ';
        s += ' } ';
        s += ' div#moduleName div.module-text:hover span.text { ';
        s += '   color: var(--popupmenuhovertitletext); ';
        s += ' } ';

        s += ' div#navMenu.nav-menu  div.top-links { ';
        s += '   padding-top: 20px; ';
        s += '   padding-bottom: 16px; ';
        s += ' } ';
        s += ' div#navMenu.nav-menu  div.top-links a { ';
        s += '   background: var(--popupmenutopbuttonbackground); ';
        s += '   color: var(--popupmenutopbuttontext); ';
        s += ' } ';
        s += ' div#navMenu.nav-menu  div.top-links a:hover { ';
        s += '   background: var(--popupmenuhovertopbuttonbackground); ';
        s += '   color: var(--popupmenuhovertopbuttontext); ';
        s += ' } ';

        s += ' div#moduleMenu div.menu-container h3 { ';
        s += '   background: var(--popupmenuprimarysectiontitlebackground); ';
        s += '   color: var(--popupmenuprimarysectiontitletext); ';
        s += ' } ';
        s += ' div#moduleMenu div.menu-container div.list-group, div#moduleMenu div.menu-container div.list-group a { ';
        s += '   background: var(--popupmenuprimarysectionbackground); ';
        s += '   color: var(--popupmenuprimarysectiontext); ';
        s += '   border: 1px solid var(--popupmenuprimarysectionbackground); ';
        s += ' } ';
        s += ' div#moduleMenu div.menu-container div.list-group a:hover { ';
        s += '   background: var(--popupmenuhoverprimarysectionbackground) !important; ';
        s += '   color: var(--popupmenuhoverprimarysectiontext) !important; ';
        s += ' } ';

        s += ' div#moduleMenu div.menu-container div.list-group ul.dropdown-menu li { ';
        s += '   color: var(--popupmenuprimarysectiontext); ';
        s += ' } ';
        s += ' div#moduleMenu div.menu-container div.list-group ul.dropdown-menu li:hover a { ';
        s += '   color: var(--popupmenuhoverprimarysectiontext); ';
        s += ' } ';
        s += ' div#moduleMenu div.menu-container div.list-group ul.dropdown-menu li a { ';
        s += '   background: transparent; ';
        s += '   border-color: transparent; ';
        s += ' } ';
        s += ' div#moduleMenu div.menu-container div.list-group ul.dropdown-menu li a:hover { ';
        s += '   background: transparent; ';
        s += ' } ';


        s += ' div#moduleMenu div.menu-container i.ac-star { ';
        s += '     color: var(--popupmenuprimaryliststar); ';
        s += ' } ';
        s += ' div#moduleMenu div.menu-container div.list-group a:hover  i.ac-star { ';
        s += '     color: var(--popupmenuhoverprimaryliststar); ';
        s += ' } ';

        s += ' div.nav-menu__expander-repeater button#moduleExpanderRepeater { ';
        s += '   background: var(--popupmenudisplayallbuttonbackground); ';
        s += '   border: 1px solid #ccc; ';
        s += '   margin-bottom: -1px; ';
        s += ' } ';


        /* ============================== */
        /* === Open Menu > More Items === */
        /* ============================== */

        s += ' div#moduleMenu div.module-name { ';
        s += '   background: var(--popupmoreitemtitlebackground); ';
        s += '   padding: 6px 10px; ';
        s += ' } ';
        s += ' div#moduleMenu div.workspaces a { ';
        s += '   background: var(--popupmoreitembuttonbackground); ';
        s += '   color: var(--popupmoreitembuttontext); ';
        s += ' } ';
        s += ' div#moduleMenu div.workspaces i, div#moduleMenu div.workspaces svg{ ';
        s += '   color: var(--popupmoreitembuttonicon); ';
        s += ' } ';
        s += ' div#moduleMenu div.workspaces a:hover { ';
        s += '   background: var(--popupmoreitemhoverbuttonbackground); ';
        s += '   color: var(--popupmoreitemhoverbuttontext); ';
        s += ' } ';
        s += ' div#moduleMenu div.workspaces a:hover  i, div#moduleMenu div.workspaces a:hover svg{ ';
        s += '   color: var(--popupmoreitemhoverbuttonicon); ';
        s += ' } ';


        /* ================== */
        /* === Main Frame === */
        /* ================== */

        s += ' div.frame-cont iframe { ';
        s += '   border: 1px solid var(--mainframeborder); ';
        s += '   background: transparent; ';
        s += '   padding: 0; ';
        s += ' } ';
        s += ' div#_layer_cont  div.list-group.layer-actions { ';
        s += '   width:100%; ';
        s += ' } ';


        s += ' div#_layer_cont div.actions { ';
        s += '   background: var(--rightmenubackground); ';
        s += ' } ';
        s += ' div#_layer_cont div.right-menu-wrapper { ';
        s += '   background: var(--rightmenubackground); ';
        s += ' } ';


        s += ' div#_layer_cont div.list-group-item { ';
        s += '   width:100% !important; ';
        s += '   background: var(--rightmenubuttonbackground); ';
        s += ' } ';
        s += ' div#_layer_cont div.list-group-item span { ';
        s += '   color: var(--rightmenubuttontext); ';
        s += ' } ';
        s += ' div#_layer_cont div.list-group-item i, div#_layer_cont div.list-group-item svg { ';
        s += '   color: var(--rightmenubuttonicon); ';
        s += ' } ';
        s += ' div#_layer_cont div.list-group-item:hover { ';
        s += '   background: var(--rightmenuhoverbuttonbackground); ';
        s += ' } ';
        s += ' div#_layer_cont div.list-group-item:hover span { ';
        s += '   color: var(--rightmenuhoverbuttontext); ';
        s += ' } ';
        s += ' div#_layer_cont div.list-group-item:hover i, div#_layer_cont div.list-group-item:hover svg { ';
        s += '   color: var(--rightmenuhoverbuttonicon); ';
        s += ' } ';


        s += ' div#_layer_cont div.list-group-item.active { ';
        s += '   background: var(--rightmenupressedbuttonbackground); ';
        s += ' } ';
        s += ' div#_layer_cont div.list-group-item.active:hover { ';
        s += '   opacity: 0.8; ';
        s += ' } ';


        s += ' div#_layer_cont div.right-footer { ';
        s += '   background: var(--rightmenutogglebuttonbackground); ';
        s += '   border-top: 1px solid #ccc; ';
        s += ' } ';
        s += ' div#_layer_cont div.right-footer:hover { ';
        s += '   background: var(--rightmenuhovertogglebuttonbackground); ';
        s += ' } ';


        var d = document, dTime = (new Date()).getTime();
        var sTag = d.createElement('STYLE');
        var fCSS = d.createTextNode(s);
        sTag.appendChild(fCSS);
        var h = d.getElementsByTagName('head')[0];
        h.appendChild(sTag);

        var keepChecker = setInterval(function(){
            var logoDiv = document.getElementById('linkLogoM');
            if(logoDiv){
                var imgLogo = logoDiv.getElementsByTagName('IMG')[0];
                if(imgLogo){
                    logoDiv.style.minWidth = '76px';
                    imgLogo.src = '//lh3.googleusercontent.com/ePbnQuKtlBAGzkr9NprSUB_TbibwFb3Hi13FNRM43LqBPJi_tK9FsBjeTD2Lfqx8Hwl5Dq-hdMUHTAA5w-Ft69cbEPbpIBc9M3WAfbl1GH_sxfq-YiJco1Fss4cqfHYtHhqHKQU8FQ';
                    imgLogo.style.cssText = 'position:absolute;top:0;bottom:0;left:0;right:0;width:36px;height:36px;border:0;padding:0;margin:auto;';
                    clearInterval(keepChecker);
                    keepChecker = null;
                }
            }
        },360);
    }
})();

/* ================== */
