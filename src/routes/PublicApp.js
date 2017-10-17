import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';

import {HomePage} from "./HomePage";
import Menu from '../components/Menu';
import Footer from "../components/Footer";
import {ProductsPage} from "./ProductsPage";

import '../styles/ionicons.min.css';
import '../styles/bootstrap.min.css';
import '../styles/font-awesome.min.css';
import '../styles/theme-main.css';
import '../styles/theme-style.css';
import '../styles/theme-responsive.css';
import '../styles/PublicApp.css'
import {FindAStorePage} from "./FindAStorePage";
import {AboutUsPage} from "./AboutUsPage";
import {ContactUsPage} from "./ContactUsPage";
import {VillagersPage} from "./VillagersPage";
import {ProductItemPage} from "./ProductItemPage";

const mixProps = (passed_props_home) => (props) => ({...passed_props_home, ...props})

class PublicApp extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            menu: props.menu,
            homeHeader: props.homeHeader,
            aboutUsHomeSection: props.aboutUsHomeSection,
            featuredStories: props.featuredStories,
            instaBanner: props.instaBanner,
            featuredProducts: props.featuredProducts,
            findAStoereBanner: props.findAStoereBanner,
            aboutUs: props.aboutUs,
            findAStore: props.findAStore,
            villagersStories: props.villagersStories,
            villagersStoriesHeader: props.villagersStoriesHeader,
            products: props.products,
            productsPageHeader: props.productsPageHeader

        }
    }

    render() {
        const {
            menu, homeHeader, aboutUsHomeSection, featuredStories, instaBanner,
            featuredProducts, findAStoereBanner, aboutUs, findAStore,
            villagersStories, villagersStoriesHeader,
            products,productsPageHeader
        } = this.state;
        const mixHomePage = mixProps({
            homeHeader,
            aboutUsHomeSection,
            featuredStories,
            instaBanner,
            featuredProducts,
            findAStoereBanner
        });
        const mixAboutPage = mixProps({aboutUs});
        const mixFindAStore = mixProps({findAStore});
        const mixVillagers = mixProps({villagersStories, villagersStoriesHeader});
        const mixProductsPage = mixProps({products,productsPageHeader})
        return (
            <div id={'wrap'}>
                {/* Header */}
                <Menu {...menu}/>
                <Switch>
                    <Route exact path="/" render={(props) => {

                        return ( <HomePage {...mixHomePage(props)}/>)
                    }
                    }/>
                    <Route exact path="/about-us" render={(props) => {

                        return ( <AboutUsPage {...mixAboutPage(props)}/>)
                    }
                    }/>
                    <Route exact path="/find-a-store" render={(props) => {

                        return ( <FindAStorePage {...mixFindAStore(props)}/>)
                    }
                    }/>
                    <Route exact path="/villagers" render={(props) => {

                        return ( <VillagersPage {...mixVillagers(props)}/>)
                    }
                    }/>

                    <Route exact path="/products" render={(props) => {

                        return ( <ProductsPage {...mixProductsPage(props)}/>)
                    }
                    }/>
                    <Route exact path="/products/:slug" render={(props) => {

                        console.log("props, ", props);
                        const products = this.state.products.filter(({slug}) => {
                            return slug === props.match.params.slug;
                        })
                        const mixProductItemPage = mixProps({products});
                        return products.length > 0 ?
                         ( <ProductItemPage {...mixProductItemPage(props)}  productFound={true}/>) :<ProductItemPage {...mixProductItemPage(props)}  productFound={false}/>;
                    }
                    }/>
                    <Route exact path="/contact-us" component={ContactUsPage}/>

                </Switch>
                <Footer {...menu}/>


            </div>
        )
    }
}

export default PublicApp;
