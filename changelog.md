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

## [Module 4]
- Pipes used to format product price, category and retrieve async products list
- Items in the cart can be sorted by properties (name, price, quantity | asc/desc)
- Fixed styles issues 
- Fix review comments from Module 3

## [Module 5]
- Header component added. Header has login butto, that opens popup with Login component.
- User logged as admin, has access to admin dashboard, defined in Admin module. If user has no permissions, module is not loaded (guard).
- Not implemented feature component added, to notify user if some features are not implemented.
- Not found component added.
- Orders module template init. User can pass to order pages if it has items in basket (guard).
- Cart service reworked (RxJS usage).
- Product view component added (with product resolver).

## [Module 6]
- Products stored on backend with json-server.
- Product requests timing interceptor was added. 
- Dark theme added with ThemeService. Theme preference saved for concrete user.
- Small styles fixes.
- Angular version updated to 11

## [Module 7]
- Migration app logic to NgRx.
- Added cart facade and @ngrx/entity for Cart feature. 
