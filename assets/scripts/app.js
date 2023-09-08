class Product {
    constructor(title, imageurl, price, description){
        this.title = title
        this.imageurl = imageurl
        this.price = price
        this.description = description
    }
}

// class untuk memproses satu data product
class ProductItem {
    // ProductItem dipanggil oleh ProductList yang mengirim argumen data product
    // jadi ProductItem sekarang memiliki data productnya
    constructor(product){
        this.product = product
    }

    addToCart(){
        // memanggil class app dan methodnya berargumen produkya
        App.addProductToCart(this.product)

    }

    render(){
         // bikin element li
        const prodL = document.createElement("li")
         // bikin class dengan nama product-item
        prodL.className = "product-item"
         // prodL nya di tambhin element html seperti di bawah ini
        prodL.innerHTML = `
            <div>
                <img src="${this.product.imageurl}" alt="${this.product.title}">
                <div class="product-item__content">
                    <h2>${this.product.title}</h2>
                    <h3>Rp.${this.product.price}</h3>
                    <p>Rp.${this.product.description}</p>
                    <button>Tambah ke Keranjang</button>
                </div>
            </div>
        `
        // mengambil button di dalam prodL lalu di dimpan di variable addCartBtn
        const addToCartButton = prodL.querySelector("button")
        addToCartButton.addEventListener("click", this.addToCart.bind(this)) // bind untuk memberi value yang ada
        return prodL
    }
}

class ShoppingCart {
    items = []

    // setter
    set cartItem(value){
        this.items = value

        this.totalOutput.innerHTML = `<h2>Total: Rp.${this.totalAmount}</h2>`
    }

    // getter
    get totalAmount(){
        // reduce 
        const sum = this.items.reduce((prevValues, curItem) => {
            return prevValues + curItem.price
        }, 0)

        return sum
    }

    addProduct(product){
        const updatedItems = [...this.items]
        updatedItems.push(product)
        this.cartItem = updatedItems
    }

    render(){
        const cartEl = document.createElement("section")
        cartEl.innerHTML = `
            <h2>Total: Rp.${0}</h2>
            <button>Pesan Sekarang</button>
        `
        cartEl.className = "cart"

        // bikin property tidak harus di contructor
        this.totalOutput = cartEl.querySelector("h2")
        return cartEl
    }
}

class ProductList {
    // product field yang otomatis menjadi property di class Product
    product = [
        new Product('bantal', 'https://contents.mediadecathlon.com/p1749048/k$f0b275c3207e208e12771a5c385d3ff8/camping-pillow-comfort.jpg?format=auto&quality=70&f=768x768', 10000, "Bantal alddin empuk"),
        new Product('karpet', 'https://cdn2.tstatic.net/travel/foto/bank/images/ilustrasi-karpet-terbang-aladdin.jpg', 80000, "Karpet halus alddin")
    ]

    constructor(){

    }

    // method megambil data product, menambah element, menampilkan datanya
    render(){
        // bikin element ul
        const prodList = document.createElement("ul")
        // bikin class dengan nama product-list
        prodList.className = "product-list"
        // perulangan untuk mengambil semua data product
        for(const prod of this.product){
            // panggil class productItem ber argumen prod yang berisi iterasi data product
            const productItem = new ProductItem(prod)
            // untuk memanggil method render di classProduct yang berisi element li
            const prodL = productItem.render()
            prodList.append(prodL)
        }
        return prodList
    }
}


// class untuk menampung class cart, product list jadi class inilah yang dipanggil
class FSW2Shop {
    render(){
        // ngambil id app
        const renderHook = document.getElementById("app")

        // memanggil class cart
        this.cart = new ShoppingCart()
        const cartEl = this.cart.render()

        // memanggil productList
        const productList = new ProductList()
        const prodList = productList.render()

        // menambahkan cart dan produk list ke div app
        renderHook.append(cartEl)
        renderHook.append(prodList)
    }
}

class App {
    // INI METHOD STATIC YAAAA
    static init(){
        // memanggil class FSW2shop
        const shop = new FSW2Shop()
        shop.render()
        this.cart = shop.cart
    }

    static addProductToCart(product){
        // memanggil method addProduct di product item
        this.cart.addProduct(product)
    }
}

// manggil method static bisa simpel kek gini wow bagus
App.init()
