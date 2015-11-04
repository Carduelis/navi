<!doctype html>
<html class="<?php echo str_ireplace(array('-', '.php'), array(' ', ''), basename($_SERVER['PHP_SELF']) ) ?>">
  <head>
  <meta charset="utf-8">
  <title>Навигация по зданию МИРЭА</title>
  
  <meta name="HandheldFriendly" content="True" />
  <meta name="MobileOptimized" content="320" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0" />
  <!--
  -->
  <meta name="format-detection" content="telephone=yes" />
  <!--
  <link href='http://fonts.googleapis.com/css?family=PT+Sans:400,700,400italic|Cuprum:400,400italic,700&subset=cyrillic,latin' rel='stylesheet' type='text/css'>
 <link href='http://fonts.googleapis.com/css?family=Lobster+Two:400italic' rel='stylesheet' type='text/css'>
  -->
  <!-- <link rel="stylesheet" href="css/style.css?24"> -->
  <!-- это для скопмилированного css -->
 <link rel="stylesheet/less" type="text/css" href="css/style.less">
  <script type="text/javascript">less = {env: "development"};</script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/less.js/2.5.1/less.min.js"></script>
  <script type="text/javascript">less.watch();</script>
  
  <!--
  -->
  
  <!--apple web app-->
  <meta name="apple-mobile-web-app-title" content="Навигация">
<link rel="apple-touch-icon" sizes="57x57" href="favicons/apple-touch-icon-57x57.png">
<link rel="apple-touch-icon" sizes="60x60" href="favicons/apple-touch-icon-60x60.png">
<link rel="apple-touch-icon" sizes="72x72" href="favicons/apple-touch-icon-72x72.png">
<link rel="apple-touch-icon" sizes="76x76" href="favicons/apple-touch-icon-76x76.png">
<link rel="apple-touch-icon" sizes="114x114" href="favicons/apple-touch-icon-114x114.png">
<link rel="icon" type="image/png" href="favicons/favicon-32x32.png" sizes="32x32">
<link rel="icon" type="image/png" href="favicons/favicon-96x96.png" sizes="96x96">
<link rel="icon" type="image/png" href="favicons/favicon-16x16.png" sizes="16x16">
<link rel="manifest" href="favicons/manifest.json">
<link rel="shortcut icon" href="favicons/favicon.ico">
<meta name="msapplication-TileColor" content="#2980B9">
<meta name="msapplication-config" content="/favicons/browserconfig.xml">
<meta name="theme-color" content="#2980B9">
  
  <!--для live refresh-->
  <!--использовать только при локальной разработке
  <script>document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>')</script>
 -->
  </head>
<body>


<i id='top_page'></i>
<header>

  <ul class='header'>
    <li class='logo'>
      <a href="#top_page"></a>
    </li>
    <li id="loading"></li>
    <li class='logotext'>
      <a href="/navi"><span class="txt">Навигация</span></a>
    </li>
    <li id='menu' class="btn">
      <a></a>
    </li>
  </ul>


  <div id='menuBody' class='hidden-block'>
    <ul>
      <li><a onclick="closeMap()">Назад к меню</a>
    </ul>
  </div>



  <div id='cartBody' class='hidden-block'>
   
  </div>



  <div id='searchBody' class='hidden-block'>
   
  </div>

</header>
