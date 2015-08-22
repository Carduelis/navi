<!doctype html>
<html>
  <head>
  <meta charset="utf-8">
  <title>Навигация по зданию МИРЭА</title>
  
  <meta name="HandheldFriendly" content="True" />
  <meta name="MobileOptimized" content="320" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="format-detection" content="telephone=yes" />
  <link href='http://fonts.googleapis.com/css?family=PT+Sans:400,700,400italic|Cuprum:400,400italic,700&subset=cyrillic,latin' rel='stylesheet' type='text/css'>
 <link href='http://fonts.googleapis.com/css?family=Lobster+Two:400italic' rel='stylesheet' type='text/css'>
  <!--это для скопмилированного css
  <link rel="stylesheet" href="css/style.css">
  -->
 <link rel="stylesheet/less" type="text/css" href="css/style.less">
<script type="text/javascript">
less = {
env: "development"
};
</script>
<script src="//cdnjs.cloudflare.com/ajax/libs/less.js/2.5.1/less.min.js"></script>
 <script type="text/javascript">less.watch();</script> 
  
  <!--apple web app-->
  <meta name="apple-mobile-web-app-title" content="Курсовая работа">
  
  <link rel="apple-touch-icon-precomposed" href="img/apple/144.png" />
  <link rel="apple-touch-icon-precomposed" sizes="57x57" href="img/apple/144.png" />
  <link rel="apple-touch-icon-precomposed" sizes="114x114" href="img/apple/144.png" />
  <link rel="apple-touch-icon-precomposed" sizes="72x72" href="img/apple/144.png" />
  <link rel="apple-touch-icon-precomposed" sizes="144x144" href="img/apple/144.png" />
  
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
      <a href="#top_page"><img src="http://goldfinch.pro/mirea1/css/logo_min.png"></a>
    </li>
    <li class='logotext'>
      <a href="main.php"><span class="txt">Навигация</span></a>
    </li>
    <li id='menu' class="btn">
      <a href='javascript:void()'></a>
    </li>
  </ul>


  <div id='menuBody' class='hidden-block'>
    <ul>
      <?php include ('includes/navi.php'); ?>
    </ul>
  </div>



  <div id='cartBody' class='hidden-block'>
   
  </div>



  <div id='searchBody' class='hidden-block'>
   
  </div>

</header>

<div id="gf-root">