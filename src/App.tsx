import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Menu,
  Search,
  ShoppingBag,
  UserRound,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, Route, Routes } from "react-router-dom";
import collarImage from "./assets/home/hero-collars.png";
import clothingImage from "./assets/home/hero-clothing.png";
import toysImage from "./assets/home/hero-toys.png";
import { useCartStore } from "./stores/cartStore";

const slides = [
  {
    eyebrow: "Colección esencial",
    title: "Collares con carácter",
    description:
      "Diseños resistentes y cómodos para acompañar cada paseo con estilo.",
    image: collarImage,
    imagePosition: "center",
  },
  {
    eyebrow: "Diversión sin pausa",
    title: "Juguetes para explorar",
    description:
      "Texturas, formas y movimiento para mantener su curiosidad siempre activa.",
    image: toysImage,
    imagePosition: "center",
  },
  {
    eyebrow: "Comodidad diaria",
    title: "Ropa que los abraza",
    description:
      "Prendas suaves y funcionales, pensadas para protegerlos con elegancia.",
    image: clothingImage,
    imagePosition: "center",
  },
];

const categories = [
  {
    name: "Ropa",
    description: "Comodidad y estilo para cada temporada",
    image: clothingImage,
    className: "category-card category-card--wide",
  },
  {
    name: "Collares",
    description: "Resistencia que acompaña cada aventura",
    image: collarImage,
    className: "category-card",
  },
  {
    name: "Juguetes",
    description: "Diversión duradera para mentes curiosas",
    image: toysImage,
    className: "category-card",
  },
];

const products = [
  {
    category: "Collares",
    name: "Collar cuero Terra",
    price: 45,
    rating: 4.9,
    image: collarImage,
    position: "72% center",
    badge: "Popular",
  },
  {
    category: "Ropa",
    name: "Suéter Active Cream",
    price: 38,
    rating: 4.8,
    image: clothingImage,
    position: "72% center",
  },
  {
    category: "Juguetes",
    name: "Set de juego Natural",
    price: 29,
    rating: 5,
    image: toysImage,
    position: "68% 78%",
  },
  {
    category: "Ropa",
    name: "Abrigo Cozy Walk",
    price: 52,
    rating: 4.7,
    image: clothingImage,
    position: "78% center",
  },
];

const collarProducts = [
  { name: "Collar cuero Terra", price: 45, rating: 4.9, badge: "Más vendido", position: "72% center" },
  { name: "Collar Urban Moss", price: 42, rating: 4.8, badge: "Nuevo", position: "62% center" },
  { name: "Collar paseo Sand", price: 39, rating: 4.7, position: "78% center" },
  { name: "Collar clásico Cocoa", price: 48, rating: 5, position: "69% center" },
  { name: "Collar diario Clay", price: 35, rating: 4.8, position: "75% center" },
  { name: "Collar aventura Oak", price: 52, rating: 4.9, badge: "Edición limitada", position: "58% center" },
];

const toyProducts = [
  { name: "Set de juego Natural", price: 29, rating: 5, badge: "Popular", position: "68% 78%" },
  { name: "Pelota Bounce Moss", price: 18, rating: 4.8, badge: "Nuevo", position: "52% 62%" },
  { name: "Cuerda Twist Terra", price: 24, rating: 4.7, position: "74% 72%" },
  { name: "Mordedor Loop Clay", price: 22, rating: 4.9, position: "64% 80%" },
  { name: "Dúo de exploración", price: 34, rating: 4.8, position: "58% 66%" },
  { name: "Juguete Wild Pebble", price: 27, rating: 4.9, badge: "Edición limitada", position: "71% 74%" },
];

const clothingProducts = [
  { name: "Suéter Active Cream", price: 38, rating: 4.8, badge: "Más vendido", position: "72% center" },
  { name: "Abrigo Cozy Walk", price: 52, rating: 4.7, badge: "Nuevo", position: "78% center" },
  { name: "Chaleco Soft Terra", price: 44, rating: 4.9, position: "63% center" },
  { name: "Polo Daily Sand", price: 32, rating: 4.8, position: "68% center" },
  { name: "Capa Rain Moss", price: 49, rating: 4.7, position: "76% center" },
  { name: "Hoodie Weekend Clay", price: 56, rating: 5, badge: "Edición limitada", position: "58% center" },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const itemCount = useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0),
  );

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" to="/">
          Triopi <span>Petshop</span>
        </Link>

        <nav className={`main-nav ${menuOpen ? "main-nav--open" : ""}`}>
          <NavLink
            className={({ isActive }) => `nav-link${isActive ? " nav-link--active" : ""}`}
            end
            to="/"
          >
            Inicio
          </NavLink>
          <NavLink
            className={({ isActive }) => `nav-link${isActive ? " nav-link--active" : ""}`}
            to="/collares"
          >
            Collares
          </NavLink>
          <NavLink
            className={({ isActive }) => `nav-link${isActive ? " nav-link--active" : ""}`}
            to="/juguetes"
          >
            Juguetes
          </NavLink>
          <NavLink
            className={({ isActive }) => `nav-link${isActive ? " nav-link--active" : ""}`}
            to="/ropa"
          >
            Ropa
          </NavLink>
          <a className="nav-link" href="#footer">
            Nosotros
          </a>
        </nav>

        <div className="header-actions">
          <label className="search-box">
            <Search aria-hidden="true" size={18} />
            <input aria-label="Buscar productos" placeholder="Buscar productos..." />
          </label>
          <button aria-label={`Carrito con ${itemCount} productos`} className="icon-button">
            <ShoppingBag size={21} />
            {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
          </button>
          <button aria-label="Mi cuenta" className="icon-button">
            <UserRound size={21} />
          </button>
          <button
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            className="menu-button"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  );
}

function HeroSlider() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 3000);

    return () => window.clearTimeout(timeout);
  }, [activeSlide]);

  const changeSlide = (direction: number) => {
    setActiveSlide(
      (current) => (current + direction + slides.length) % slides.length,
    );
  };

  return (
    <section
      aria-label="Colecciones destacadas"
      aria-roledescription="carrusel"
      className="hero-slider"
    >
      {slides.map((slide, index) => (
        <article
          aria-hidden={activeSlide !== index}
          className={`hero-slide ${activeSlide === index ? "hero-slide--active" : ""}`}
          key={slide.title}
        >
          <img
            alt=""
            className="hero-image"
            src={slide.image}
            style={{ objectPosition: slide.imagePosition }}
          />
          <div className="hero-overlay" />
          <div className="hero-content">
            <span className="eyebrow">{slide.eyebrow}</span>
            <h1>{slide.title}</h1>
            <p>{slide.description}</p>
            <a className="primary-button" href="#mas-vendidos">
              Explorar tienda <ArrowRight size={18} />
            </a>
          </div>
        </article>
      ))}

      <div className="slider-controls">
        <button aria-label="Colección anterior" onClick={() => changeSlide(-1)}>
          <ChevronLeft />
        </button>
        <button aria-label="Siguiente colección" onClick={() => changeSlide(1)}>
          <ChevronRight />
        </button>
      </div>

      <div className="slider-dots">
        {slides.map((slide, index) => (
          <button
            aria-label={`Mostrar ${slide.title}`}
            aria-pressed={activeSlide === index}
            className={activeSlide === index ? "slider-dot--active" : ""}
            key={slide.title}
            onClick={() => setActiveSlide(index)}
          >
            <span />
          </button>
        ))}
      </div>
    </section>
  );
}

function CategoriesSection() {
  return (
    <section className="section-shell" id="categorias">
      <div className="section-heading">
        <div>
          <span className="section-kicker">Encuentra su favorito</span>
          <h2>Categorías</h2>
          <p>Todo lo que necesita para disfrutar cada aventura.</p>
        </div>
        <a className="text-link" href="#mas-vendidos">
          Ver todo <ArrowRight size={16} />
        </a>
      </div>

      <div className="category-grid">
        {categories.map((category) => (
          <a
            className={`${category.className} animated-card`}
            href="#mas-vendidos"
            key={category.name}
          >
            <img alt="" src={category.image} />
            <div className="category-shade" />
            <div className="category-copy">
              <h3>{category.name}</h3>
              <p>{category.description}</p>
            </div>
          </a>
        ))}

        <div className="category-quote animated-card">
          <span>Diseñado para acompañarlos</span>
          <blockquote>“Calidad que se siente en cada paso.”</blockquote>
          <a href="#mas-vendidos">Ver colección</a>
        </div>
      </div>
    </section>
  );
}

function BestSellersSection() {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <section className="best-sellers" id="mas-vendidos">
      <div className="section-shell">
        <div className="section-heading">
          <div>
            <span className="section-kicker">Elegidos por nuestra comunidad</span>
            <h2>Más vendidos</h2>
            <p>Favoritos que combinan diseño, comodidad y resistencia.</p>
          </div>
        </div>

        <div className="product-grid">
          {products.map((product, index) => (
            <article className="product-card animated-card" key={product.name}>
              <div className="product-image-wrap">
                {product.badge && <span className="product-badge">{product.badge}</span>}
                <img
                  alt={product.name}
                  className="product-image"
                  src={product.image}
                  style={{ objectPosition: product.position }}
                />
              </div>
              <div className="product-info">
                <span>{product.category}</span>
                <h3>{product.name}</h3>
                <div className="product-meta">
                  <strong>S/ {product.price.toFixed(2)}</strong>
                  <span>{product.rating.toFixed(1)} ★</span>
                </div>
                <button
                  onClick={() =>
                    addItem({
                      productId: index + 1,
                      name: product.name,
                      price: product.price,
                      quantity: 1,
                    })
                  }
                >
                  Agregar al carrito
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="footer">
      <div className="footer-inner">
        <div>
          <Link className="footer-brand" to="/">
            Triopi Petshop
          </Link>
          <p>Bienestar, diseño y alegría para quienes hacen hogar con nosotros.</p>
        </div>
        <div>
          <h3>Atención</h3>
          <a href="/">Política de privacidad</a>
          <a href="/">Términos de servicio</a>
        </div>
        <div>
          <h3>Servicios</h3>
          <a href="/">Información de envío</a>
          <a href="/">Contáctanos</a>
        </div>
      </div>
    </footer>
  );
}

function useRevealCards() {
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(".animated-card");

    if (!("IntersectionObserver" in window)) {
      cards.forEach((card) => card.classList.add("animated-card--visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const card = entry.target as HTMLElement;

            if (card.dataset.revealed === "true") {
              return;
            }

            card.dataset.revealed = "true";
            card.classList.add("animated-card--visible", "animated-card--entering");
            card.addEventListener(
              "animationend",
              () => card.classList.remove("animated-card--entering"),
              { once: true },
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);
}

function HomePage() {
  useRevealCards();

  return (
    <div className="site-page">
      <Header />
      <main>
        <HeroSlider />
        <CategoriesSection />
        <BestSellersSection />
      </main>
      <Footer />
    </div>
  );
}

function CollarsPage() {
  const addItem = useCartStore((state) => state.addItem);
  useRevealCards();

  return (
    <div className="site-page collars-page">
      <Header />
      <main>
        <section className="collars-hero">
          <div className="collars-hero-copy">
            <div className="breadcrumbs">
              <Link to="/">Inicio</Link>
              <span>/</span>
              <span>Collares</span>
            </div>
            <span className="section-kicker">Colección esencial</span>
            <h1>Collares para cada aventura.</h1>
            <p>
              Piezas cómodas, resistentes y con carácter para acompañar todos sus paseos.
            </p>
            <a className="primary-button" href="#catalogo-collares">
              Ver colección <ArrowRight size={18} />
            </a>
          </div>
          <div className="collars-hero-visual" aria-hidden="true">
            <div className="collars-orbit collars-orbit--one" />
            <div className="collars-orbit collars-orbit--two" />
            <img alt="" src={collarImage} />
            <span className="collars-hero-label">Hecho para pasear</span>
          </div>
        </section>

        <section className="collars-catalog section-shell" id="catalogo-collares">
          <div className="collars-catalog-heading">
            <div>
              <span className="section-kicker">Catálogo</span>
              <h2>Todos los collares</h2>
              <p>6 diseños disponibles para cada tamaño y personalidad.</p>
            </div>
            <span className="catalog-count">06 productos</span>
          </div>

          <div className="collar-filters" aria-label="Filtros de collares">
            <button className="filter-chip filter-chip--active" type="button">Todos</button>
            <button className="filter-chip" type="button">Cuero</button>
            <button className="filter-chip" type="button">Paseo</button>
            <button className="filter-chip" type="button">Ajustables</button>
          </div>

          <div className="collar-grid">
            {collarProducts.map((product, index) => (
              <article className="collar-product-card animated-card" key={product.name}>
                <div className="collar-product-image">
                  {product.badge && <span className="product-badge">{product.badge}</span>}
                  <img alt={product.name} src={collarImage} style={{ objectPosition: product.position }} />
                  <span className="collar-image-index">0{index + 1}</span>
                </div>
                <div className="collar-product-info">
                  <span>Collares</span>
                  <h3>{product.name}</h3>
                  <div>
                    <strong>S/ {product.price.toFixed(2)}</strong>
                    <span>{product.rating.toFixed(1)} ★</span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      addItem({
                        productId: 101 + index,
                        name: product.name,
                        price: product.price,
                        quantity: 1,
                      })
                    }
                  >
                    Agregar al carrito
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function ToysPage() {
  const addItem = useCartStore((state) => state.addItem);
  useRevealCards();

  return (
    <div className="site-page toys-page">
      <Header />
      <main>
        <section className="toys-hero">
          <div className="toys-hero-copy">
            <div className="breadcrumbs">
              <Link to="/">Inicio</Link>
              <span>/</span>
              <span>Juguetes</span>
            </div>
            <span className="section-kicker">Diversión sin pausa</span>
            <h1>Juguetes que despiertan su curiosidad.</h1>
            <p>
              Texturas, formas y movimiento para transformar cada momento en una nueva aventura.
            </p>
            <a className="toys-primary-button" href="#catalogo-juguetes">
              Explorar juguetes <ArrowRight size={18} />
            </a>
          </div>
          <div className="toys-hero-visual" aria-hidden="true">
            <span className="toy-shape toy-shape--one" />
            <span className="toy-shape toy-shape--two" />
            <span className="toy-shape toy-shape--three" />
            <img alt="" src={toysImage} />
            <span className="toys-hero-label">Jugar también es cuidar</span>
          </div>
        </section>

        <section className="toys-catalog section-shell" id="catalogo-juguetes">
          <div className="toys-catalog-heading">
            <div>
              <span className="section-kicker">Catálogo</span>
              <h2>Juguetes para explorar</h2>
              <p>6 favoritos para morder, perseguir y descubrir.</p>
            </div>
            <span className="catalog-count">06 productos</span>
          </div>

          <div className="toy-filters" aria-label="Filtros de juguetes">
            <button className="toy-filter-chip toy-filter-chip--active" type="button">Todos</button>
            <button className="toy-filter-chip" type="button">Mordedores</button>
            <button className="toy-filter-chip" type="button">Interactivos</button>
            <button className="toy-filter-chip" type="button">Pelotas</button>
          </div>

          <div className="toy-grid">
            {toyProducts.map((product, index) => (
              <article className="toy-product-card animated-card" key={product.name}>
                <div className="toy-product-image">
                  {product.badge && <span className="product-badge">{product.badge}</span>}
                  <img alt={product.name} src={toysImage} style={{ objectPosition: product.position }} />
                  <span className="toy-image-index">0{index + 1}</span>
                </div>
                <div className="toy-product-info">
                  <span>Juguetes</span>
                  <h3>{product.name}</h3>
                  <div>
                    <strong>S/ {product.price.toFixed(2)}</strong>
                    <span>{product.rating.toFixed(1)} ★</span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      addItem({
                        productId: 201 + index,
                        name: product.name,
                        price: product.price,
                        quantity: 1,
                      })
                    }
                  >
                    Agregar al carrito
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function ClothingPage() {
  const addItem = useCartStore((state) => state.addItem);
  useRevealCards();

  return (
    <div className="site-page clothing-page">
      <Header />
      <main>
        <section className="clothing-hero">
          <div className="clothing-hero-copy">
            <div className="breadcrumbs">
              <Link to="/">Inicio</Link>
              <span>/</span>
              <span>Ropa</span>
            </div>
            <span className="section-kicker">Comodidad diaria</span>
            <h1>Ropa que acompaña cada paso.</h1>
            <p>
              Prendas suaves y funcionales, hechas para protegerlos y darles libertad de movimiento.
            </p>
            <a className="clothing-primary-button" href="#catalogo-ropa">
              Ver colección <ArrowRight size={18} />
            </a>
          </div>
          <div className="clothing-hero-visual" aria-hidden="true">
            <span className="clothing-line clothing-line--one" />
            <span className="clothing-line clothing-line--two" />
            <img alt="" src={clothingImage} />
            <span className="clothing-hero-label">Suave por dentro y por fuera</span>
          </div>
        </section>

        <section className="clothing-catalog section-shell" id="catalogo-ropa">
          <div className="clothing-catalog-heading">
            <div>
              <span className="section-kicker">Catálogo</span>
              <h2>Ropa para su ritmo</h2>
              <p>6 prendas para pasear, descansar y disfrutar cada temporada.</p>
            </div>
            <span className="catalog-count">06 productos</span>
          </div>

          <div className="clothing-filters" aria-label="Filtros de ropa">
            <button className="clothing-filter-chip clothing-filter-chip--active" type="button">Todos</button>
            <button className="clothing-filter-chip" type="button">Abrigos</button>
            <button className="clothing-filter-chip" type="button">Suéteres</button>
            <button className="clothing-filter-chip" type="button">Paseo</button>
          </div>

          <div className="clothing-grid">
            {clothingProducts.map((product, index) => (
              <article className="clothing-product-card animated-card" key={product.name}>
                <div className="clothing-product-image">
                  {product.badge && <span className="product-badge">{product.badge}</span>}
                  <img alt={product.name} src={clothingImage} style={{ objectPosition: product.position }} />
                  <span className="clothing-image-index">0{index + 1}</span>
                </div>
                <div className="clothing-product-info">
                  <span>Ropa</span>
                  <h3>{product.name}</h3>
                  <div>
                    <strong>S/ {product.price.toFixed(2)}</strong>
                    <span>{product.rating.toFixed(1)} ★</span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      addItem({
                        productId: 301 + index,
                        name: product.name,
                        price: product.price,
                        quantity: 1,
                      })
                    }
                  >
                    Agregar al carrito
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route element={<HomePage />} path="/" />
      <Route element={<CollarsPage />} path="/collares" />
      <Route element={<ToysPage />} path="/juguetes" />
      <Route element={<ClothingPage />} path="/ropa" />
    </Routes>
  );
}

export default App;
