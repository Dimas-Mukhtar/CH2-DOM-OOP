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
        return prodL
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
        // ngambil id app
        const renderHook = document.getElementById("app")
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

        // nambahin prolist yang ul ke renderHook yng id app
        renderHook.append(prodList)
    }
}

const productList = new ProductList()
productList.render()