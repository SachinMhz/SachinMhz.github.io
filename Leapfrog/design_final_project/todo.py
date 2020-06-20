all:
    padding left right 15 in all container


header
    header img: 
        wrap in a tag 
        responsive width
            decrease size of header icon
            remove tag-line
            
        ham-burger menu use button and wrap in a tag

    nav
        use specific width for all nav items with text centered
            .nav li a {
            // specific width  154px
            // specific height    114px
            // text-align: center
            }

            .nav li a.active {
            // another specific width 170
            // another specific height 165
            // other css
            }

    
banner:
    add image as background:
        use property background-size cover


<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <link rel="stylesheet" type="text/css" href="./css/reset.css" />
    <link rel="stylesheet" type="text/css" href="./css/layout.css" />
    <link rel="stylesheet" type="text/css" href="./css/style.css" />
    <title>Design Final Assignment - Travel</title>
  </head>
  <body>
    <div class="main-container-wrapper">
      <!-- ----------------------------------------------------start of header -->
      <div class="header-wrapper">
        <div class="header container clearfix">
          <a
            href="#"
            title="Home - Travler"
            class="header-left float-left clearfix"
          >
            <div class="header-img-container float-left">
              <img
                class="header-img"
                src="./images/logo.png"
                alt="travel logo"
              />
            </div>
            <div class="header-name-container float-right">
              <h1 class="header-name">travler</h1>
              <p class="header-tag">Get the advice you need about travel</p>
            </div>
          </a>
          <!--end of header left-->
          <div class="header-right float-right clearfix">
            <ul class="header-list float-left">
              <li class="header-list-item">
                <p class="header-list-text">Quicklinks</p>
                <img
                  class="header-list-img"
                  src="./images/location.png"
                  alt="location icon"
                />
              </li>
              <li class="header-list-item">
                <p class="header-list-text">Select from dropdown</p>
                <img
                  class="header-list-img"
                  src="./images/drop-down.png"
                  alt="location icon"
                />
              </li>
            </ul>
            <form class="header-search-container float-left">
              <input
                class="header-search-input"
                placeholder="Search for something here"
                type="text"
              />
              <img
                class="header-search-img"
                src="./images/clock-blue.png"
                alt="search icon"
              />
            </form>
            <div class="ham-menu-container float-right>
            <a hre="#" class="ham-menu-link">
              <span class="ham-menu"> &#9776; </span>
            </a>
          </div>
        </div>
        <div class="nav-wrapper clearfix">
          <ul class="nav-list">
            <li class="nav-list-item">
              <a class="link no-style" href="#" title="Travel Guide">
                <img
                  class="nav-list-img"
                  src="./images/world.png"
                  alt="world icon"
                />
                <p class="nav-list-text">Travel Guide</p></a
              >
            </li>
            <li class="nav-list-item active">
              <a class="link no-style active" href="#" title="Travel Guide">
                <img
                  class="nav-list-img"
                  src="./images/world.png"
                  alt="world icon"
                />
                <p class="nav-list-text">Services</p></a
              >
            </li>
            <li class="nav-list-item">
              <a class="link no-style" href="#" title="Travel Guide">
                <img
                  class="nav-list-img"
                  src="./images/world.png"
                  alt="world icon"
                />
                <p class="nav-list-text">About</p></a
              >
            </li>
            <li class="nav-list-item">
              <a class="link no-style" href="#" title="Travel Guide">
                <img
                  class="nav-list-img"
                  src="./images/world.png"
                  alt="world icon"
                />
                <p class="nav-list-text">The Tour</p></a
              >
            </li>
            <li class="nav-list-item">
              <a class="link no-style" href="#" title="Travel Guide">
                <img
                  class="nav-list-img"
                  src="./images/world.png"
                  alt="world icon"
                />
                <p class="nav-list-text">How to</p></a
              >
            </li>
            <li class="nav-list-item">
              <a class="link no-style" href="#" title="Travel Guide">
                <img
                  class="nav-list-img"
                  src="./images/world.png"
                  alt="world icon"
                />
                <p class="nav-list-text">Contact</p></a
              >
            </li>
          </ul>
        </div>
        </div>
        <!--end of header right-->
      </div>
      <!--end of header-->
      <!-- ----------------------------------------------------start of header -->

      <!--end of nav-->

      <div class="banner-wrapper">
        <img
          class="banner-img"
          src="./images/bg1.png"
          alt="banner background image"
        />
        <div class="circle-container">
          <img
            class="circle-logo"
            src="./images/logo_with_bg.png"
            alt="logo white"
          />
        </div>
      </div>
      <!--end of banner-->
      <div class="banner2-wrapper">
        <div class="banner2-container">
          <p class="banner2-heading">Anywhere, anytime, where here to help.</p>
          <p class="banner2-heading-desc">And we mean that.</p>
          <div class="banner2-img-container">
            <img
              class="banner2-img"
              src="./images/mapIMG.png"
              alt="map location image"
            />
          </div>
          <div class="banner2-list-wrapper">
            <ul class="banner2-list row clearfix">
              <li class="banner2-list-item col">
                <p class="banner2-list-title">Save time</p>
                <p class="banner2-list-desc">
                  Lets throw a trackie dacks also it'll be gutta. You little
                  ripper avos flamin lets throw a lizard drinking. Gutful of jug
                  where as busy as a big smoke. Grab us a billy as cunning as a
                  bull bar. As cunning as a bonzer flamin as stands out like
                  cubby house. As cross as a mate no dramas as cunning as a
                  bonzer. Gutful of kindie flamin as cross as a grundies. Lets
                  throw a strides also as cross as a thingo. Built like a old
                  fella no dramas grab us a ten clicks away. Lets get some
                  digger when she'll be right metho. As cross as a no dramas as
                  cunning as a barrack.
                </p>
              </li>
              <li class="banner2-list-item col">
                <p class="banner2-list-title">Win over the team</p>
                <p class="banner2-list-desc">
                  As cunning as a bonzer flamin as stands out like cubby house.
                  As cross as a mate no dramas as cunning as a bonzer. Gutful of
                  kindie flamin as cross as a grundies. Lets throw a strides
                  also as cross as a thingo.<br />
                  Built like a old fella no dramas grab us a ten clicks away.
                </p>
              </li>
              <li class="banner2-list-item col">
                <p class="banner2-list-title">Design Features</p>
                <p class="banner2-list-desc">
                  Built like a old fella no dramas grab us a ten clicks away.
                  Lets get some digger when she'll be right metho. As cross as a
                  no dramas as cunning as a barrack.<br />
                  A old fella no dramas grab us a ten clicks away. Lets get some
                  digger when she'll be right metho. As cross as a no dramas as
                  cunning as a barrack.
                </p>
              </li>
            </ul>
          </div>
        </div>
        <!--end of banner2-->
      </div>
      <!--end of banner2-->
      <div class="section3-wrapper">
        <div class="section3-container">
          <div class="section3-img-container">
            <img class="section3-img" src='./images/section3_bg_07.png' alt="background image"/>
            <div class="section3-text-content">
              <p class='section3-text-heading'>A simple begining lead to big ideas</p>
              <p class='section3-text-desc'>We started small but grew quickly.</p>
            </div>
          </div>
        </div>
      </div> <!--end section3-wrapper-->
      <div class="team-section-wrapper">
        <div class="team-section-container container">
          <div class="team-heading-container">
            <p class='team-heading-text'>A humble Team we are</p>
            <p class='team-heading-text-tag'>We'll some of us anyways</p>
          </div>
          <div class="team-images-container">
            <ul class="member-row clearfix">
              <li class="member-col">
                <div class="member-img-rotated-bg"></div> 
                <div class="member-img-container"> 
                  <img class="member-img" src="./images/member1.png" alt="picture of user 1"/>
                  <div class='twitter-container'>
                    <img class="twitter-img" src="./images/twitter-icon.png" alt="twitter icon"/>
                  </div>
                </div>
                <div class='member-details-container'>
                  <p class='member-name'>Josh Jashan</p>
                  <p class='member-designation'>Digital Producer</p>
                </div>
              </li><li class="member-col">
                <div class="member-img-rotated-bg"></div> 
                <div class="member-img-container"> 
                  <img class="member-img" src="./images/member1.png" alt="picture of user 1"/>
                  <div class='twitter-container'>
                    <img class="twitter-img" src="./images/twitter-icon.png" alt="twitter icon"/>
                  </div>
                </div>
                <div class='member-details-container'>
                  <p class='member-name'>Josh Jashan</p>
                  <p class='member-designation'>Digital Producer</p>
                </div>
              </li><li class="member-col">
                <div class="member-img-rotated-bg"></div> 
                <div class="member-img-container"> 
                  <img class="member-img" src="./images/member1.png" alt="picture of user 1"/>
                  <div class='twitter-container'>
                    <img class="twitter-img" src="./images/twitter-icon.png" alt="twitter icon"/>
                  </div>
                </div>
                <div class='member-details-container'>
                  <p class='member-name'>Josh Jashan</p>
                  <p class='member-designation'>Digital Producer</p>
                </div>
              </li><li class="member-col">
                <div class="member-img-rotated-bg"></div> 
                <div class="member-img-container"> 
                  <img class="member-img" src="./images/member1.png" alt="picture of user 1"/>
                  <div class='twitter-container'>
                    <img class="twitter-img" src="./images/twitter-icon.png" alt="twitter icon"/>
                  </div>
                </div>
                <div class='member-details-container'>
                  <p class='member-name'>Josh Jashan</p>
                  <p class='member-designation'>Digital Producer</p>
                </div>
              </li>
            </ul>
          </div>
          <div class="indicator-container">
            <ul class="indicator-row center-hor">
              <li class="indicator-col active"/>
              <li class="indicator-col"/>
              <li class="indicator-col"/>
              <li class="indicator-col"/>
            </ul>
          </div>
          <div class="team-content-container">
              <ul class="team-content-row">
                <li class="team-content-col">
                  <div class="plus-container">
                    <img src='./images/plus.png' alt='plus icon'/>
                  </div>
                  <h2 class="team-content-heading">Winning Design Awards</h2>
                  <p class="team-content-desc1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu turpis purus. Pellentesque ullamcorper mauris vitae sapien bibendum tincidunt. Check leo dignissim +
                  </p>
                  <p class="team-content-desc2">Morbi malesuada mauris sed nibh placerat sit amet posuere libero egestas. Vestibulum consectetur iaculis est, at dapibus purus malesuada vitae. Mauris sollicitudin aliquam scelerisque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec et mi sem. Duis tristique elementum tristique. Sed ac magna quis erat sagittis suscipit. Phasellus faucibus rhoncus massa, non laoreet lorem fringilla non.
                  </p>
                </li>
                <li class="team-content-col">
                  <div class="plus-container">
                    <img src='./images/plus.png' alt='plus icon'/>
                  </div>
                  <h2 class="team-content-heading">Winning Design Awards</h2>
                  <p class="team-content-desc1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu turpis purus. Pellentesque ullamcorper mauris vitae sapien bibendum tincidunt. Check leo dignissim +
                  </p>
                  <p class="team-content-desc2">Morbi malesuada mauris sed nibh placerat sit amet posuere libero egestas. Vestibulum consectetur iaculis est, at dapibus purus malesuada vitae. Mauris sollicitudin aliquam scelerisque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec et mi sem. Duis tristique elementum tristique. Sed ac magna quis erat sagittis suscipit. Phasellus faucibus rhoncus massa, non laoreet lorem fringilla non.
                  </p>
                </li>
              </ul>
          </div>
        </div>
      </div><!--end team-section-wrapper-->
    </div>
  </body>
</html>
