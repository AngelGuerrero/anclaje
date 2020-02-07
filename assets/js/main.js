/* =================================
------------------------------------
	Labs - Design Studio
	Version: 1.0
 ------------------------------------ 
 ====================================*/

"use strict";

/*------------------
	Preloder
--------------------*/
function loader() {
  $(window).on("load", function() {
    $(".loader").fadeOut();
    $("#preloder")
      .delay(10)
      .fadeOut("slow");
  });
}

/*------------------
	Navigation
--------------------*/
function responsive() {
  // Responsive
  $(".responsive").on("click", function(event) {
    $(".menu-list").slideToggle(400);
    event.preventDefault();
  });
}

/*------------------
	Hero Section
--------------------*/
function heroSection() {
  //Slide item bg image.
  $(".hero-item").each(function() {
    var image = $(this).data("bg");
    $(this).css({
      "background-image": "url(" + image + ")",
      "background-size": "cover",
      "background-repeat": "no-repeat",
      "background-position": "center bottom",
    });
  });
  //slider auto height
  var iit = setInterval(slide_item, 1);

  function slide_item() {
    var bh = $("body").height();
    $(".hero-item").height(bh);
  }
  slide_item();

  var time = 7;
  var $progressBar, $bar, $elem, isPause, tick, percentTime;

  // Init the carousel
  $("#hero-slider").owlCarousel({
    loop: true,
    nav: true,
    items: 1,
    autoHeight: true,
    animateOut: "fadeOut",
    animateIn: "fadeIn",
    navText: [
      '<i class="fa fa-angle-left"></i>',
      '<i class="fa fa-angle-right"></i>',
    ],
    onInitialized: progressBar,
    onTranslated: moved,
    onDrag: pauseOnDragging,
  });

  // Init progressBar where elem is $("#owl-demo")
  function progressBar() {
    // build progress bar elements
    buildProgressBar();

    // start counting
    start();
  }

  // create div#progressBar and div#bar then prepend to $("#owl-demo")
  function buildProgressBar() {
    $progressBar = $("<div>", {
      id: "progressBar",
    });
    $bar = $("<div>", {
      id: "bar",
    });
    $progressBar.append($bar).prependTo($("#hero-slider"));
  }

  function start() {
    // reset timer
    percentTime = 0;
    isPause = false;
    // run interval every 0.01 second
    tick = setInterval(interval, 10);
  }

  function interval() {
    if (isPause === false) {
      percentTime += 1 / time;

      $bar.css({
        width: percentTime + "%",
      });

      // if percentTime is equal or greater than 100
      if (percentTime >= 100) {
        // slide to next item
        $("#hero-slider").trigger("next.owl.carousel");
        percentTime = 0; // give the carousel at least the animation time ;)
      }
    }
  }

  // pause while dragging
  function pauseOnDragging() {
    isPause = true;
  }

  // moved callback
  function moved() {
    // clear interval
    clearTimeout(tick);
    // start again
    start();
  }
}

/*------------------
	Video Popup
--------------------*/
/* function videoPopup() {
	$('.video-popup').magnificPopup({
		type: 'iframe',
		autoplay : true
	});
} */

/*------------------
	Testimonial
--------------------*/
// function testimonial() {
//   // testimonial Carousel
//   $("#testimonial-slide").owlCarousel({
//     loop: true,
//     autoplay: true,
//     margin: 30,
//     nav: false,
//     dots: true,
//     responsive: {
//       0: {
//         items: 1,
//       },
//       600: {
//         items: 2,
//       },
//       800: {
//         items: 2,
//       },
//       1000: {
//         items: 2,
//       },
//     },
//   });
// }

/*------------------
	Progress bar
--------------------*/
function progressbar() {
  $(".progress-bar-style").each(function() {
    var progress = $(this).data("progress");
    var prog_width = progress + "%";
    if (progress <= 100) {
      $(this).append(
        '<div class="bar-inner" style="width:' +
          prog_width +
          '"><span>' +
          prog_width +
          "</span></div>"
      );
    } else {
      $(this).append(
        '<div class="bar-inner" style="width:100%"><span>' +
          prog_width +
          "</span></div>"
      );
    }
  });
}

/*------------------
	Accordions
--------------------*/
function accordions() {
  $(".panel").on("click", function(e) {
    $(".panel").removeClass("active");
    var $this = $(this);
    if (!$this.hasClass("active")) {
      $this.addClass("active");
    }
    e.preventDefault();
  });
}

/*------------------
	Progress Circle
--------------------*/
function progressCircle() {
  //Set progress circle 1
  $("#progress1").circleProgress({
    value: 0.75,
    size: 175,
    thickness: 5,
    fill: "#2be6ab",
    emptyFill: "rgba(0, 0, 0, 0)",
  });
  //Set progress circle 2
  $("#progress2").circleProgress({
    value: 0.83,
    size: 175,
    thickness: 5,
    fill: "#2be6ab",
    emptyFill: "rgba(0, 0, 0, 0)",
  });
  //Set progress circle 3
  $("#progress3").circleProgress({
    value: 0.25,
    size: 175,
    thickness: 5,
    fill: "#2be6ab",
    emptyFill: "rgba(0, 0, 0, 0)",
  });
  //Set progress circle 4
  $("#progress4").circleProgress({
    value: 0.95,
    size: 175,
    thickness: 5,
    fill: "#2be6ab",
    emptyFill: "rgba(0, 0, 0, 0)",
  });
}

(function($) {
  // Call all functions
  loader();
  responsive();
  heroSection();
  // testimonial();
  // progressbar();
  //videoPopup();
  // accordions();
  //progressCircle();
})(jQuery);

//
// Componentes
//

Vue.component("portfolioModal", {
  template: "#portfolio-modal",

  props: ["proyecto"],

  data() {
    return {
      show: true,
    };
  },

  methods: {
    emitCerrar() {
      this.$emit("cerrar-modal");
    },
  },
});

Vue.component("contactoForm", {
  template: "#contact-form",

  data() {
    return {
      form: {
        nombre: "",
        email: "",
        asunto: "",
        mensaje: "",
      },
    };
  },

  methods: {
    async enviar() {
      const response = await fetch("http://anclajemedia.com.mx/contacto.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body:
          "nombre=" +
          this.form.nombre +
          "&email=" +
          this.form.email +
          "&asunto=" +
          this.form.asunto +
          "&mensaje=" +
          this.form.mensaje,
      }).then(function(res) {
        return res;
      });

      let res = await response.json();

      if (res.error) {
        swal("Error!", res.mensaje, "error");
      } else {
        swal("Ok!", res.mensaje, "success");
        this.resetForm();
      }
    },

    resetForm() {
      this.form.nombre = "";
      this.form.email = "";
      this.form.asunto = "";
      this.form.mensaje = "";
    },
  },
});

// ==================================

//
// Instancia de Vue para el menú
var vmMenu = new Vue({
  el: "#header",

  data: {
    antiguoIndex: 0,
    menu: window.menu
  },

  methods: {
    toggleClass(nuevoIndex) {
      this.menu[this.antiguoIndex].activo = false;
      this.menu[nuevoIndex].activo = true;
      this.antiguoIndex = nuevoIndex;
    }
  }
});

//
// Instancia de Vue para los proyectos
var vmProyectos = new Vue({
  el: "#portafolio",

  computed: {
    sm() {
      let num = 12 / this.proyectos.length;
      return "col-sm-" + num;
    },

    md() {
      let num = 12 / this.proyectos.length;
      return "col-md-" + num;
    },

    lg() {
      let num = 12 / this.proyectos.length;
      return "col-lg-" + num;
    },
  },

  data: {
    seleccionado: null,

    proyectos: window.proyectos,
  },

  methods: {
    seleccionar(p) {
      this.seleccionado = p;
      this.toggleClases();
    },

    cerrar() {
      this.seleccionado = null;
      this.toggleClases();
    },

    toggleClases() {
      let claseOcultarSeccion = "hide__section";
      let clasePreventScroll = "body__prevent-scroll";

      let header = document.getElementById("header");
      let hero = document.getElementById("hero");
      let body = document.getElementById("body");

      if (this.seleccionado) {
        header.classList.add(claseOcultarSeccion);
        hero.classList.add(claseOcultarSeccion);
        body.classList.add(clasePreventScroll);
      } else {
        header.classList.remove(claseOcultarSeccion);
        hero.classList.remove(claseOcultarSeccion);
        body.classList.remove(clasePreventScroll);
      }
    },
  },
});

//
// Instancia de Vue para los servicios
var vmServicios = new Vue({
  el: "#servicios",

  data: {
    servicios: window.servicios,
  },
});

//
// Instancia de Vue para contacto
var vmContacto = new Vue({
  el: "#contacto",
});
