# Changelog
Project changes will be described in this file.

## [Module 1]
- Created Shop Project
- Created Category enum
- Created Cart and Product models with corresponding components
- Created CartList and ProductList components and services to retrieve
- Added Buy button for Product component. When user click Buy - it writes to console log message. Button disabled if product is unavailable
- Angular Material & Flex Layout used to style app 

## [Module 2]
- Added cart service
- User can add items to cart on product page
- Services injected to components, used some component lifecycle hooks
- Added highlight directive to cart list item
- User can modify product quantity, remove product from cart, see cart total
- created modules: Product, Cart, Shared. Shared module includes all wide-used components
- Buy button changed to Add to Cart. When user clicks button - it shows notification that product was added to cart
- Reworked styles to be more mobile-friendly
- Fix review comments from Module 1

## [Module 3]
- Added all required methods to cart service
- Constants, Generator, ConfigOptions services and Generator factory are added
- Cart service store data in local storage
- FontAdjustment directive added. When user clicks button 'Add to Cart' - it changes the font size according given input 
- Fix review comments from Module 2