import {
  ArrowLeft,
  ArrowRight,
  CreditCard,
  Heart,
  LockKeyhole,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  Mail,
  Minus,
  PackageCheck,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  UserRound,
  X,
} from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { Link, NavLink, Route, Routes } from "react-router-dom";
import collarImage from "./assets/home/hero-collars.png";
import clothingImage from "./assets/home/hero-clothing.png";
import toysImage from "./assets/home/hero-toys.png";
import { useAuth } from "./auth/useAuth";
import { apiClient } from "./api/client";
import { useCartStore } from "./stores/cartStore";

type ApiProduct = {
  id: number;
  name: string;
  price: number;
  stock: number;
  categoryName: string;
};

type ApiOrder = {
  id: number;
  status: "PENDING" | "PAID" | "CANCELLED";
  total: number;
  createdAt: string;
};

type ApiProfile = {
  id: number;
  name: string;
  email: string;
  role: "ADMIN" | "CLIENT";
};

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

const profileOrders = [
  { id: "#TR-2048", date: "12 oct 2026", status: "En camino", total: "S/ 87.00" },
  { id: "#TR-1982", date: "28 sep 2026", status: "Entregado", total: "S/ 45.00" },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuth();
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
          <Link aria-label={`Carrito con ${itemCount} productos`} className="icon-button" to="/carrito">
            <ShoppingBag size={21} />
            {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
          </Link>
          <Link aria-label={user ? "Mi cuenta" : "Iniciar sesión"} className="icon-button" to={user ? "/perfil" : "/acceso"}>
            <UserRound size={21} />
          </Link>
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
  const [catalog, setCatalog] = useState<ApiProduct[]>([]);

  useEffect(() => {
    apiClient.get<ApiProduct[]>("/products")
      .then((response) => setCatalog(response.data.filter((product) => product.stock > 0).slice(0, 4)))
      .catch(() => setCatalog([]));
  }, []);

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
          {catalog.map((product, index) => (
            <article className="product-card animated-card" key={product.name}>
              <div className="product-image-wrap">
                <img
                  alt={product.name}
                  className="product-image"
                  src={products[index % products.length].image}
                  style={{ objectPosition: products[index % products.length].position }}
                />
              </div>
              <div className="product-info">
                <span>{product.categoryName}</span>
                <h3>{product.name}</h3>
                <div className="product-meta">
                  <strong>S/ {product.price.toFixed(2)}</strong>
                  <span>{product.stock} disponibles</span>
                </div>
                <button
                  onClick={() =>
                    addItem({
                      productId: product.id,
                      name: product.name,
                      price: product.price,
                      quantity: 1,
                      stock: product.stock,
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

function CartPage() {
  const { user } = useAuth();
  const clearCart = useCartStore((state) => state.clearCart);
  const decreaseItem = useCartStore((state) => state.decreaseItem);
  const increaseItem = useCartStore((state) => state.increaseItem);
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const replaceItems = useCartStore((state) => state.replaceItems);
  const [checkoutError, setCheckoutError] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [catalogNotice, setCatalogNotice] = useState("");

  useEffect(() => {
    apiClient.get<ApiProduct[]>("/products")
      .then((response) => {
        const catalog = new Map(response.data.map((product) => [product.id, product]));
        const currentItems = useCartStore.getState().items;
        const syncedItems = currentItems.flatMap((item) => {
          const product = catalog.get(item.productId);
          if (!product || product.stock < 1) return [];
          return [{ productId: product.id, name: product.name, price: product.price, quantity: Math.min(item.quantity, product.stock), stock: product.stock }];
        });
        if (syncedItems.length !== currentItems.length) setCatalogNotice("Actualizamos tu bolsa: algunos productos ya no estan disponibles.");
        replaceItems(syncedItems);
      })
      .catch(() => setCatalogNotice("No pudimos actualizar el stock. Se validara antes del pago."));
  }, [replaceItems]);

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  const handleCheckout = async () => {
    if (items.length === 0) {
      setCheckoutError("Agrega productos disponibles antes de continuar.");
      return;
    }

    if (!user) {
      setCheckoutError("Inicia sesión para crear el pedido y continuar al pago.");
      return;
    }

    setCheckoutError("");
    setIsCheckingOut(true);

    try {
      const orderResponse = await apiClient.post<{ id: number }>("/orders", {
        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      });
      const paymentResponse = await apiClient.post<{ checkoutUrl: string }>(
        "/payments/create-preference",
        { orderId: orderResponse.data.id },
      );

      if (!paymentResponse.data.checkoutUrl) {
        throw new Error("No se recibió la URL de pago.");
      }

      clearCart();
      window.location.assign(paymentResponse.data.checkoutUrl);
    } catch {
      setCheckoutError(
        "No pudimos iniciar el pago. Verifica tu sesión, el stock y la configuración de pagos.",
      );
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="site-page cart-page">
      <Header />
      <main className="cart-main section-shell">
        <div className="cart-heading">
          <div>
            <div className="breadcrumbs"><Link to="/">Inicio</Link><span>/</span><span>Carrito</span></div>
            <span className="section-kicker">Tu selección</span>
            <h1>Bolsa de compras</h1>
            <p>{itemCount ? `${itemCount} producto${itemCount === 1 ? "" : "s"} listo${itemCount === 1 ? "" : "s"} para acompañar sus aventuras.` : "Aún no agregaste productos a tu bolsa."}</p>
          </div>
          {items.length > 0 && <button className="cart-clear" type="button" onClick={clearCart}>Vaciar bolsa</button>}
        </div>

        {catalogNotice && <p className="cart-error">{catalogNotice}</p>}
        {items.length === 0 ? (
          <section className="cart-empty">
            <ShoppingBag size={34} />
            <h2>Tu bolsa está esperando.</h2>
            <p>Descubre productos pensados para sus paseos, juegos y momentos de descanso.</p>
            <Link to="/">Explorar tienda <ArrowRight size={17} /></Link>
          </section>
        ) : (
          <div className="cart-layout">
            <section className="cart-items" aria-label="Productos en tu carrito">
              {items.map((item) => (
                <article className="cart-item" key={item.productId}>
                  <div className="cart-item-art"><ShoppingBag size={23} /></div>
                  <div className="cart-item-info"><span>Triopi Petshop</span><h2>{item.name}</h2><strong>S/ {item.price.toFixed(2)}</strong></div>
                  <div className="cart-quantity" aria-label={`Cantidad de ${item.name}`}>
                    <button aria-label={`Reducir ${item.name}`} type="button" onClick={() => decreaseItem(item.productId)}><Minus size={15} /></button>
                    <span>{item.quantity}</span>
                    <button aria-label={`Aumentar ${item.name}`} disabled={item.quantity >= (item.stock ?? Number.MAX_SAFE_INTEGER)} type="button" onClick={() => increaseItem(item.productId)}><Plus size={15} /></button>
                  </div>
                  <strong className="cart-item-total">S/ {(item.price * item.quantity).toFixed(2)}</strong>
                  <button aria-label={`Eliminar ${item.name}`} className="cart-remove" type="button" onClick={() => removeItem(item.productId)}><Trash2 size={18} /></button>
                </article>
              ))}
            </section>

            <aside className="cart-summary">
              <span className="section-kicker">Resumen</span>
              <h2>Tu pedido</h2>
              <div className="cart-summary-row"><span>Subtotal</span><strong>S/ {subtotal.toFixed(2)}</strong></div>
              <div className="cart-summary-row"><span>Envío</span><span>Se calcula al pagar</span></div>
              <div className="cart-total"><span>Total estimado</span><strong>S/ {subtotal.toFixed(2)}</strong></div>
              {checkoutError && <p className="cart-error">{checkoutError}</p>}
              <button className="cart-checkout" disabled={isCheckingOut} type="button" onClick={handleCheckout}>
                <CreditCard size={18} /> {isCheckingOut ? "Preparando pago..." : "Continuar al pago"}
              </button>
              {!user && <p className="cart-login-hint">El pago requiere una sesión activa. <Link to="/acceso">Inicia sesión o crea tu cuenta.</Link></p>}
              <div className="cart-security"><ShieldCheck size={18} /><span>El total y el stock se validan de forma segura en el backend.</span></div>
              <Link className="cart-continue" to="/"><ArrowLeft size={16} /> Seguir comprando</Link>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}

function AuthPage() {
  const { login, user } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitAuth = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (mode === "register" && name.trim().length < 2) {
      setError("Ingresa tu nombre completo.");
      return;
    }

    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    setIsSubmitting(true);

    try {
      const endpoint = mode === "login" ? "/auth/login" : "/auth/register";
      const payload = mode === "login" ? { email, password } : { name: name.trim(), email, password };
      const response = await apiClient.post<{
        token: string;
        userId: number;
        name: string;
        email: string;
        role: "ADMIN" | "CLIENT";
      }>(endpoint, payload);

      login(response.data.token, {
        id: response.data.userId,
        name: response.data.name,
        email: response.data.email,
        role: response.data.role === "ADMIN" ? "ADMIN" : "CLIENT",
      });
    } catch {
      setError(
        mode === "login"
          ? "No pudimos iniciar sesión. Revisa tu correo y contraseña."
          : "No pudimos crear tu cuenta. Es posible que el correo ya esté registrado.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (user) {
    return (
      <div className="site-page auth-page"><Header /><main className="auth-main"><section className="auth-card auth-card--signed"><UserRound size={30} /><span className="section-kicker">Sesión activa</span><h1>Ya estás dentro, {user.name.split(" ")[0]}.</h1><p>Tu cuenta está lista para continuar comprando.</p><Link to="/perfil">Ir a mi perfil <ArrowRight size={17} /></Link></section></main></div>
    );
  }

  return (
    <div className="site-page auth-page">
      <Header />
      <main className="auth-main">
        <section className="auth-showcase" aria-hidden="true">
          <img alt="" src={collarImage} />
          <div><span>Triopi Petshop</span><strong>Todo para sus mejores días.</strong></div>
        </section>
        <section className="auth-panel">
          <div className="auth-panel-inner">
            <Link className="auth-back" to="/"><ArrowLeft size={16} /> Volver a la tienda</Link>
            <span className="section-kicker">Mi cuenta</span>
            <h1>{mode === "login" ? "Qué bueno verte." : "Crea tu cuenta."}</h1>
            <p>{mode === "login" ? "Inicia sesión para continuar con tu compra y ver tus pedidos." : "Regístrate para guardar tus pedidos y pagar de forma segura."}</p>
            <div className="auth-tabs" role="tablist">
              <button className={mode === "login" ? "auth-tab auth-tab--active" : "auth-tab"} type="button" onClick={() => { setMode("login"); setError(""); }}>Iniciar sesión</button>
              <button className={mode === "register" ? "auth-tab auth-tab--active" : "auth-tab"} type="button" onClick={() => { setMode("register"); setError(""); }}>Crear cuenta</button>
            </div>
            <form className="auth-form" key={mode} onSubmit={submitAuth}>
              {mode === "register" && <label>Nombre completo<input autoComplete="name" onChange={(event) => setName(event.target.value)} placeholder="Tu nombre" required value={name} /></label>}
              <label>Correo electrónico<div className="auth-input"><Mail size={17} /><input autoComplete="email" onChange={(event) => setEmail(event.target.value)} placeholder="tu@correo.com" required type="email" value={email} /></div></label>
              <label>Contraseña<div className="auth-input"><LockKeyhole size={17} /><input autoComplete={mode === "login" ? "current-password" : "new-password"} minLength={8} onChange={(event) => setPassword(event.target.value)} placeholder="Mínimo 8 caracteres" required type="password" value={password} /></div></label>
              {error && <p className="auth-error">{error}</p>}
              <button className="auth-submit" disabled={isSubmitting} type="submit">{isSubmitting ? "Procesando..." : mode === "login" ? "Iniciar sesión" : "Crear mi cuenta"} <ArrowRight size={17} /></button>
            </form>
            <p className="auth-note">Al continuar aceptas los términos de servicio y la política de privacidad de Triopi Petshop.</p>
          </div>
        </section>
      </main>
    </div>
  );
}

function ProfilePage() {
  const { logout, updateUser, user } = useAuth();
  const [profile, setProfile] = useState<ApiProfile | null>(null);
  const [orders, setOrders] = useState<ApiOrder[]>([]);
  const [draft, setDraft] = useState({ name: "", email: "", password: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  useRevealCards();

  useEffect(() => {
    if (!user) return;
    Promise.all([apiClient.get<ApiProfile>("/users/me"), apiClient.get<ApiOrder[]>("/orders/my-orders")])
      .then(([profileResponse, ordersResponse]) => {
        setProfile(profileResponse.data);
        setDraft({ name: profileResponse.data.name, email: profileResponse.data.email, password: "" });
        setOrders(ordersResponse.data);
      })
      .catch(() => setMessage("No pudimos cargar tu informacion. Intenta actualizar la pagina."))
      .finally(() => setIsLoading(false));
  }, [user]);

  const saveProfile = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setIsSaving(true);
    try {
      const response = await apiClient.put<{ profile: ApiProfile; token: string }>("/users/me", draft);
      setProfile(response.data.profile);
      setDraft({ name: response.data.profile.name, email: response.data.profile.email, password: "" });
      updateUser({ id: response.data.profile.id, name: response.data.profile.name, email: response.data.profile.email, role: response.data.profile.role });
      localStorage.setItem("petshop-token", response.data.token);
      setIsEditing(false);
      setMessage("Tus datos se guardaron correctamente.");
    } catch {
      setMessage("No pudimos guardar los cambios. Revisa los datos e intenta otra vez.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) {
    return <div className="site-page profile-page"><Header /><main className="auth-main"><section className="auth-card auth-card--signed"><UserRound size={30} /><span className="section-kicker">Mi cuenta</span><h1>Inicia sesion para ver tu perfil.</h1><p>Tu informacion y tus pedidos estan protegidos en tu cuenta.</p><Link to="/acceso">Ir a iniciar sesion <ArrowRight size={17} /></Link></section></main></div>;
  }

  const activeProfile = profile ?? user;
  const firstName = activeProfile.name.split(" ")[0];
  const initials = activeProfile.name.split(" ").map((part) => part[0]).slice(0, 2).join("");

  return (
    <div className="site-page profile-page">
      <Header />
      <main className="profile-main section-shell">
        <div className="profile-intro"><div><div className="breadcrumbs"><Link to="/">Inicio</Link><span>/</span><span>Mi cuenta</span></div><span className="section-kicker">Mi espacio</span><h1>Hola, {firstName}.</h1><p>Gestiona tu informacion, pedidos y favoritos desde un solo lugar.</p></div></div>
        <div className="profile-layout">
          <aside className="profile-sidebar animated-card"><div className="profile-avatar">{initials}</div><h2>{activeProfile.name}</h2><p>{activeProfile.email}</p><span className="profile-role">{activeProfile.role === "ADMIN" ? "Administrador" : "Cliente Triopi"}</span><nav aria-label="Navegacion de perfil" className="profile-nav"><a className="profile-nav-item profile-nav-item--active" href="#mi-perfil"><UserRound size={18} /> Mi perfil</a><a className="profile-nav-item" href="#mis-pedidos"><PackageCheck size={18} /> Mis pedidos</a><a className="profile-nav-item" href="#favoritos"><Heart size={18} /> Favoritos</a><a className="profile-nav-item" href="#ajustes"><Settings size={18} /> Ajustes</a></nav><button className="profile-logout" type="button" onClick={logout}><LogOut size={17} /> Cerrar sesion</button></aside>
          <div className="profile-content">
            <section className="profile-card animated-card" id="mi-perfil"><form onSubmit={saveProfile}><div className="profile-card-heading"><div><span className="section-kicker">Datos personales</span><h2>Tu perfil</h2></div><button type={isEditing ? "submit" : "button"} disabled={isSaving} onClick={() => !isEditing && setIsEditing(true)}>{isSaving ? "Guardando..." : isEditing ? "Guardar cambios" : "Editar informacion"}</button></div><div className="profile-fields"><label>Nombre completo<input disabled={!isEditing} onChange={(event) => setDraft({ ...draft, name: event.target.value })} required value={isEditing ? draft.name : activeProfile.name} /></label><label>Correo electronico<input disabled={!isEditing} onChange={(event) => setDraft({ ...draft, email: event.target.value })} required type="email" value={isEditing ? draft.email : activeProfile.email} /></label>{isEditing && <label>Contrasena nueva (opcional)<input autoComplete="new-password" minLength={8} onChange={(event) => setDraft({ ...draft, password: event.target.value })} placeholder="Deja vacio para conservarla" type="password" value={draft.password} /></label>}</div></form>{message && <p className="auth-error">{message}</p>}</section>
            <section className="profile-card animated-card" id="mis-pedidos"><div className="profile-card-heading"><div><span className="section-kicker">Historial</span><h2>Pedidos recientes</h2></div></div><div className="profile-orders">{isLoading ? <p>Cargando pedidos...</p> : orders.length === 0 ? <p>Aun no tienes pedidos. Cuando completes una compra aparecera aqui.</p> : orders.map((order) => <article className="profile-order" key={order.id}><div className="profile-order-icon"><PackageCheck size={20} /></div><div><strong>#{order.id}</strong><span>{new Intl.DateTimeFormat("es-PE", { dateStyle: "medium" }).format(new Date(order.createdAt))}</span></div><span className={`order-status ${order.status === "PENDING" ? "order-status--shipping" : ""}`}>{order.status === "PENDING" ? "Pendiente de pago" : order.status === "PAID" ? "Pagado" : "Cancelado"}</span><strong>S/ {Number(order.total).toFixed(2)}</strong></article>)}</div></section>
            <section className="profile-favorites animated-card" id="favoritos"><Heart size={22} /><div><span className="section-kicker">Tus favoritos</span><h2>Aun no guardaste productos.</h2><p>Explora las colecciones y guarda lo que mas le guste.</p></div><Link to="/">Explorar tienda <ArrowRight size={16} /></Link></section>
          </div>
        </div>
      </main>
    </div>
  );
}

export function LegacyProfilePage() {
  const { logout, user } = useAuth();
  const profile = user ?? {
    id: 0,
    name: "Valentina Ramos",
    email: "valentina@ejemplo.com",
    role: "CLIENT" as const,
  };
  const firstName = profile.name.split(" ")[0];
  const initials = profile.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  useRevealCards();

  return (
    <div className="site-page profile-page">
      <Header />
      <main className="profile-main section-shell">
        <div className="profile-intro">
          <div>
            <div className="breadcrumbs">
              <Link to="/">Inicio</Link>
              <span>/</span>
              <span>Mi cuenta</span>
            </div>
            <span className="section-kicker">Mi espacio</span>
            <h1>Hola, {firstName}.</h1>
            <p>Gestiona tu información, pedidos y favoritos desde un solo lugar.</p>
          </div>
          {!user && <span className="profile-demo-badge">Vista de demostración</span>}
        </div>

        <div className="profile-layout">
          <aside className="profile-sidebar animated-card">
            <div className="profile-avatar">{initials}</div>
            <h2>{profile.name}</h2>
            <p>{profile.email}</p>
            <span className="profile-role">{profile.role === "ADMIN" ? "Administrador" : "Cliente Triopi"}</span>
            <nav aria-label="Navegación de perfil" className="profile-nav">
              <a className="profile-nav-item profile-nav-item--active" href="#mi-perfil"><UserRound size={18} /> Mi perfil</a>
              <a className="profile-nav-item" href="#mis-pedidos"><PackageCheck size={18} /> Mis pedidos</a>
              <a className="profile-nav-item" href="#favoritos"><Heart size={18} /> Favoritos</a>
              <a className="profile-nav-item" href="#ajustes"><Settings size={18} /> Ajustes</a>
            </nav>
            {user && (
              <button className="profile-logout" type="button" onClick={logout}>
                <LogOut size={17} /> Cerrar sesión
              </button>
            )}
          </aside>

          <div className="profile-content">
            <section className="profile-card animated-card" id="mi-perfil">
              <div className="profile-card-heading">
                <div>
                  <span className="section-kicker">Datos personales</span>
                  <h2>Tu perfil</h2>
                </div>
                <button type="button">Editar información</button>
              </div>
              <div className="profile-fields">
                <label>Nombre completo<input readOnly value={profile.name} /></label>
                <label>Correo electrónico<input readOnly value={profile.email} /></label>
                <label>Teléfono<input placeholder="Agrega tu teléfono" readOnly /></label>
                <label>Distrito<input placeholder="Agrega tu distrito" readOnly /></label>
              </div>
            </section>

            <section className="profile-card animated-card" id="mis-pedidos">
              <div className="profile-card-heading">
                <div>
                  <span className="section-kicker">Historial</span>
                  <h2>Pedidos recientes</h2>
                </div>
                <button type="button">Ver todos</button>
              </div>
              <div className="profile-orders">
                {profileOrders.map((order) => (
                  <article className="profile-order" key={order.id}>
                    <div className="profile-order-icon"><PackageCheck size={20} /></div>
                    <div><strong>{order.id}</strong><span>{order.date}</span></div>
                    <span className={`order-status ${order.status === "En camino" ? "order-status--shipping" : ""}`}>{order.status}</span>
                    <strong>{order.total}</strong>
                  </article>
                ))}
              </div>
            </section>

            <section className="profile-favorites animated-card" id="favoritos">
              <Heart size={22} />
              <div><span className="section-kicker">Tus favoritos</span><h2>Aún no guardaste productos.</h2><p>Explora las colecciones y guarda lo que más le guste.</p></div>
              <Link to="/collares">Explorar tienda <ArrowRight size={16} /></Link>
            </section>
          </div>
        </div>
      </main>
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
      <Route element={<ProfilePage />} path="/perfil" />
      <Route element={<CartPage />} path="/carrito" />
      <Route element={<AuthPage />} path="/acceso" />
    </Routes>
  );
}

export default App;
