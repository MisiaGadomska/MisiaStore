const createFooter = () => {
    let footer = document.querySelector('footer');

    footer.innerHTML = ` 
    <div class="footer-content">
                    <img src="images/logo-biale.png" class="logo" alt="">
                    <div class="footer-ul-container">
                        <ul class="category">
                            <li class="category-title">men</li>
                            <li><a href="#" class="footer-link">t-shirt</a></li>
                            <li><a href="#" class="footer-link">sweatshirts</a></li>
                            <li><a href="#" class="footer-link">shirts</a></li>
                            <li><a href="#" class="footer-link">jeans</a></li>
                            <li><a href="#" class="footer-link">trousers</a></li>
                            <li><a href="#" class="footer-link">shoes</a></li>
                            <li><a href="#" class="footer-link">casuals</a></li>
                            <li><a href="#" class="footer-link">sports</a></li>
                            <li><a href="#" class="footer-link">watch</a></li>

                        </ul>
                        <ul class="category">
                            <li class="category-title">women</li>
                            <li><a href="#" class="footer-link">t-shirt</a></li>
                            <li><a href="#" class="footer-link">sweatshirts</a></li>
                            <li><a href="#" class="footer-link">shirts</a></li>
                            <li><a href="#" class="footer-link">jeans</a></li>
                            <li><a href="#" class="footer-link">trousers</a></li>
                            <li><a href="#" class="footer-link">shoes</a></li>
                            <li><a href="#" class="footer-link">casuals</a></li>
                            <li><a href="#" class="footer-link">sports</a></li>
                            <li><a href="#" class="footer-link">watch</a></li>

                        </ul>
                    </div>
                    
                </div>
                <p class="footer-title"> about company </p>
                    <p> Jesteśmy wyjątkową, polską marką odzieżową. Z ogromnymi sukcesami działamy w branży slow fashion.
  Naszą filozofią jest tworzenie kolekcji opartych na przemyślanej, zrównoważonej produkcji.
  Stawiamy na wysoką jakość, dlatego też wszystkie ubrania szyjemy w Polsce, 
  współpracując z lokalnymi firmami na Mazurach. </p>

                    <p class="info">support emails - help@clothing.com, customersupport@clothing.com</p>
                    <p class="info">telephone - 123 456 678, 190 000 000</p>
                    <div class="footer-social-container">
                        <div>
                            <a href="#" class="social-link">terms & services</a>
                            <a href="#" class="social-link"> privacy page</a>
                        </div>
                        <div>
                            <a href="https://www.instagram.com/misiagadomska/?hl=pl" class="social-link">instagram</a>
                            <a href="https://www.facebook.com/Niallofficial/" class="social-link">Facebook</a>
                            <a href="https://x.com/horankahazza" class="social-link">Twitter</a>
                        </div>
                    </div>
                    <p class="footer-credit">Ootday, Best apparels online shop</p>
    
    `;
}

createFooter();