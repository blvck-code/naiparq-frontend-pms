'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">naiparq-frontend-pms documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-d5052fd0bc2b7e525570ea0bb77e3493c4d8987631136806d6acfc6d805de60997abc373edfee68af28483827dc3c48fead2f47eab4ee1e6f1be3366391b5487"' : 'data-bs-target="#xs-components-links-module-AppModule-d5052fd0bc2b7e525570ea0bb77e3493c4d8987631136806d6acfc6d805de60997abc373edfee68af28483827dc3c48fead2f47eab4ee1e6f1be3366391b5487"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-d5052fd0bc2b7e525570ea0bb77e3493c4d8987631136806d6acfc6d805de60997abc373edfee68af28483827dc3c48fead2f47eab4ee1e6f1be3366391b5487"' :
                                            'id="xs-components-links-module-AppModule-d5052fd0bc2b7e525570ea0bb77e3493c4d8987631136806d6acfc6d805de60997abc373edfee68af28483827dc3c48fead2f47eab4ee1e6f1be3366391b5487"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AuthModule-44f213c98d46275e5d8f243cc2a71a33560a4a527bdd475816214e2c9778d9a01f3da90e6ad801c83c8811a1a98de98f1991b25e13a72389ecbf652849b56325"' : 'data-bs-target="#xs-components-links-module-AuthModule-44f213c98d46275e5d8f243cc2a71a33560a4a527bdd475816214e2c9778d9a01f3da90e6ad801c83c8811a1a98de98f1991b25e13a72389ecbf652849b56325"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AuthModule-44f213c98d46275e5d8f243cc2a71a33560a4a527bdd475816214e2c9778d9a01f3da90e6ad801c83c8811a1a98de98f1991b25e13a72389ecbf652849b56325"' :
                                            'id="xs-components-links-module-AuthModule-44f213c98d46275e5d8f243cc2a71a33560a4a527bdd475816214e2c9778d9a01f3da90e6ad801c83c8811a1a98de98f1991b25e13a72389ecbf652849b56325"' }>
                                            <li class="link">
                                                <a href="components/AuthComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ConfirmResetComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConfirmResetComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegisterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegisterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ResetComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResetComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VerifyComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VerifyComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthRoutingModule.html" data-type="entity-link" >AuthRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DashboardModule.html" data-type="entity-link" >DashboardModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-DashboardModule-e7de959027040539000f198bd61b9fc430d59e97e8771b3d81db5941ca07b6c717211eda87abcaa7803db09bb1654c41697e920e3d9bee35347ae5dcf4c71bde"' : 'data-bs-target="#xs-components-links-module-DashboardModule-e7de959027040539000f198bd61b9fc430d59e97e8771b3d81db5941ca07b6c717211eda87abcaa7803db09bb1654c41697e920e3d9bee35347ae5dcf4c71bde"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DashboardModule-e7de959027040539000f198bd61b9fc430d59e97e8771b3d81db5941ca07b6c717211eda87abcaa7803db09bb1654c41697e920e3d9bee35347ae5dcf4c71bde"' :
                                            'id="xs-components-links-module-DashboardModule-e7de959027040539000f198bd61b9fc430d59e97e8771b3d81db5941ca07b6c717211eda87abcaa7803db09bb1654c41697e920e3d9bee35347ae5dcf4c71bde"' }>
                                            <li class="link">
                                                <a href="components/AccountComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccountComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AnalyticsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AnalyticsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AssetsManagementComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AssetsManagementComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DashComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DriveInComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DriveInComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LinearGraphComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LinearGraphComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LogsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LogsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MotoristManagementComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MotoristManagementComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NotificationsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotificationsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PremisesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PremisesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RevenuesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RevenuesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SettingsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SettingsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SideNavComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SideNavComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserManagementComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserManagementComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DashboardRoutingModule.html" data-type="entity-link" >DashboardRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HomeModule.html" data-type="entity-link" >HomeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-HomeModule-d3ec5166e3a84b5401cc995966e3c7f16e969125812cddeb22dd8fcc07715d9d83820e044b69129b2edf1115c86a2c91daf87e6c61a369ef0164be7b36bd6ba8"' : 'data-bs-target="#xs-components-links-module-HomeModule-d3ec5166e3a84b5401cc995966e3c7f16e969125812cddeb22dd8fcc07715d9d83820e044b69129b2edf1115c86a2c91daf87e6c61a369ef0164be7b36bd6ba8"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomeModule-d3ec5166e3a84b5401cc995966e3c7f16e969125812cddeb22dd8fcc07715d9d83820e044b69129b2edf1115c86a2c91daf87e6c61a369ef0164be7b36bd6ba8"' :
                                            'id="xs-components-links-module-HomeModule-d3ec5166e3a84b5401cc995966e3c7f16e969125812cddeb22dd8fcc07715d9d83820e044b69129b2edf1115c86a2c91daf87e6c61a369ef0164be7b36bd6ba8"' }>
                                            <li class="link">
                                                <a href="components/AboutComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AboutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BlogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BlogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BlogCreateComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BlogCreateComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BlogDetailComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BlogDetailComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BlogListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BlogListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CarouselComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CarouselComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ContactComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ContactComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LandingComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LandingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PmsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PmsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ReservationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReservationComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomeRoutingModule.html" data-type="entity-link" >HomeRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link" >SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SharedModule-20df5dab23d988de89b602f96764c1ee2172ca36fe671a5b12cd3f1547ae3c143d4eecae3032f8f2b1ca11525a98a8f389fdb5fefff6910262026b91f69f75f4"' : 'data-bs-target="#xs-components-links-module-SharedModule-20df5dab23d988de89b602f96764c1ee2172ca36fe671a5b12cd3f1547ae3c143d4eecae3032f8f2b1ca11525a98a8f389fdb5fefff6910262026b91f69f75f4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-20df5dab23d988de89b602f96764c1ee2172ca36fe671a5b12cd3f1547ae3c143d4eecae3032f8f2b1ca11525a98a8f389fdb5fefff6910262026b91f69f75f4"' :
                                            'id="xs-components-links-module-SharedModule-20df5dab23d988de89b602f96764c1ee2172ca36fe671a5b12cd3f1547ae3c143d4eecae3032f8f2b1ca11525a98a8f389fdb5fefff6910262026b91f69f75f4"' }>
                                            <li class="link">
                                                <a href="components/BillingComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BillingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DriveOutComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DriveOutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InlineLoaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InlineLoaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PageNotFoundComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PageNotFoundComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#pipes-links-module-SharedModule-20df5dab23d988de89b602f96764c1ee2172ca36fe671a5b12cd3f1547ae3c143d4eecae3032f8f2b1ca11525a98a8f389fdb5fefff6910262026b91f69f75f4"' : 'data-bs-target="#xs-pipes-links-module-SharedModule-20df5dab23d988de89b602f96764c1ee2172ca36fe671a5b12cd3f1547ae3c143d4eecae3032f8f2b1ca11525a98a8f389fdb5fefff6910262026b91f69f75f4"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-SharedModule-20df5dab23d988de89b602f96764c1ee2172ca36fe671a5b12cd3f1547ae3c143d4eecae3032f8f2b1ca11525a98a8f389fdb5fefff6910262026b91f69f75f4"' :
                                            'id="xs-pipes-links-module-SharedModule-20df5dab23d988de89b602f96764c1ee2172ca36fe671a5b12cd3f1547ae3c143d4eecae3032f8f2b1ca11525a98a8f389fdb5fefff6910262026b91f69f75f4"' }>
                                            <li class="link">
                                                <a href="pipes/TruncatePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TruncatePipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AddAsset.html" data-type="entity-link" >AddAsset</a>
                            </li>
                            <li class="link">
                                <a href="classes/BillingItem.html" data-type="entity-link" >BillingItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/BillingItem-1.html" data-type="entity-link" >BillingItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/Billings.html" data-type="entity-link" >Billings</a>
                            </li>
                            <li class="link">
                                <a href="classes/Billings-1.html" data-type="entity-link" >Billings</a>
                            </li>
                            <li class="link">
                                <a href="classes/CountryRenewableElectricity.html" data-type="entity-link" >CountryRenewableElectricity</a>
                            </li>
                            <li class="link">
                                <a href="classes/CountryRenewableElectricityItem.html" data-type="entity-link" >CountryRenewableElectricityItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateBlog.html" data-type="entity-link" >CreateBlog</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateBlogFail.html" data-type="entity-link" >CreateBlogFail</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateBlogSuccess.html" data-type="entity-link" >CreateBlogSuccess</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteBlog.html" data-type="entity-link" >DeleteBlog</a>
                            </li>
                            <li class="link">
                                <a href="classes/FetchBlog.html" data-type="entity-link" >FetchBlog</a>
                            </li>
                            <li class="link">
                                <a href="classes/FetchBlogFail.html" data-type="entity-link" >FetchBlogFail</a>
                            </li>
                            <li class="link">
                                <a href="classes/FetchBlogSuccess.html" data-type="entity-link" >FetchBlogSuccess</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoadBillings.html" data-type="entity-link" >LoadBillings</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoadBillingsFail.html" data-type="entity-link" >LoadBillingsFail</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoadBillingsSuccess.html" data-type="entity-link" >LoadBillingsSuccess</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoadDevices.html" data-type="entity-link" >LoadDevices</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoadDevicesSuccess.html" data-type="entity-link" >LoadDevicesSuccess</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoadDriveIn.html" data-type="entity-link" >LoadDriveIn</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoadDriveInSuccess.html" data-type="entity-link" >LoadDriveInSuccess</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoadDriveOut.html" data-type="entity-link" >LoadDriveOut</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoadDriveOutFail.html" data-type="entity-link" >LoadDriveOutFail</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoadDriveOutSuccess.html" data-type="entity-link" >LoadDriveOutSuccess</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoadMoreDriveIn.html" data-type="entity-link" >LoadMoreDriveIn</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoadMoreDriveInFail.html" data-type="entity-link" >LoadMoreDriveInFail</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoadMoreDriveInSuccess.html" data-type="entity-link" >LoadMoreDriveInSuccess</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoadOrganizations.html" data-type="entity-link" >LoadOrganizations</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoadOrganizationsSuccess.html" data-type="entity-link" >LoadOrganizationsSuccess</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoadProfile.html" data-type="entity-link" >LoadProfile</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoadProfileFail.html" data-type="entity-link" >LoadProfileFail</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoadProfileSuccess.html" data-type="entity-link" >LoadProfileSuccess</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoadSpaces.html" data-type="entity-link" >LoadSpaces</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoadSpacesSuccess.html" data-type="entity-link" >LoadSpacesSuccess</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoadUsers.html" data-type="entity-link" >LoadUsers</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoadUsersSuccess.html" data-type="entity-link" >LoadUsersSuccess</a>
                            </li>
                            <li class="link">
                                <a href="classes/LogIn.html" data-type="entity-link" >LogIn</a>
                            </li>
                            <li class="link">
                                <a href="classes/LogInFail.html" data-type="entity-link" >LogInFail</a>
                            </li>
                            <li class="link">
                                <a href="classes/LogInSuccess.html" data-type="entity-link" >LogInSuccess</a>
                            </li>
                            <li class="link">
                                <a href="classes/LogOut.html" data-type="entity-link" >LogOut</a>
                            </li>
                            <li class="link">
                                <a href="classes/LogOutFail.html" data-type="entity-link" >LogOutFail</a>
                            </li>
                            <li class="link">
                                <a href="classes/LogOutSuccess.html" data-type="entity-link" >LogOutSuccess</a>
                            </li>
                            <li class="link">
                                <a href="classes/RefreshToken.html" data-type="entity-link" >RefreshToken</a>
                            </li>
                            <li class="link">
                                <a href="classes/RefreshTokenSuccess.html" data-type="entity-link" >RefreshTokenSuccess</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResetInvalid.html" data-type="entity-link" >ResetInvalid</a>
                            </li>
                            <li class="link">
                                <a href="classes/SelectedBlog.html" data-type="entity-link" >SelectedBlog</a>
                            </li>
                            <li class="link">
                                <a href="classes/SelectedSpaceId.html" data-type="entity-link" >SelectedSpaceId</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignUp.html" data-type="entity-link" >SignUp</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignUpFail.html" data-type="entity-link" >SignUpFail</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignUpSuccess.html" data-type="entity-link" >SignUpSuccess</a>
                            </li>
                            <li class="link">
                                <a href="classes/UploadAdapter.html" data-type="entity-link" >UploadAdapter</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthEffects.html" data-type="entity-link" >AuthEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DashService.html" data-type="entity-link" >DashService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HomeEffects.html" data-type="entity-link" >HomeEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HomeService.html" data-type="entity-link" >HomeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SharedService.html" data-type="entity-link" >SharedService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SpacesEffects.html" data-type="entity-link" >SpacesEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StorageService.html" data-type="entity-link" >StorageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StoreService.html" data-type="entity-link" >StoreService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interceptors-links"' :
                            'data-bs-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/AuthInterceptor.html" data-type="entity-link" >AuthInterceptor</a>
                            </li>
                            <li class="link">
                                <a href="interceptors/ErrorInterceptor.html" data-type="entity-link" >ErrorInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AdminGuard.html" data-type="entity-link" >AdminGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/BloggerGuard.html" data-type="entity-link" >BloggerGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/ActionExecutable.html" data-type="entity-link" >ActionExecutable</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AllUsersModel.html" data-type="entity-link" >AllUsersModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AppState.html" data-type="entity-link" >AppState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AuthState.html" data-type="entity-link" >AuthState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BillingEntities.html" data-type="entity-link" >BillingEntities</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BillingModel.html" data-type="entity-link" >BillingModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BillingResponseModel.html" data-type="entity-link" >BillingResponseModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BlogEntity.html" data-type="entity-link" >BlogEntity</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BlogModel.html" data-type="entity-link" >BlogModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BlogResponseModel.html" data-type="entity-link" >BlogResponseModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/carouselContent.html" data-type="entity-link" >carouselContent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DashboardState.html" data-type="entity-link" >DashboardState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DevicesModel.html" data-type="entity-link" >DevicesModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DevicesResponseModel.html" data-type="entity-link" >DevicesResponseModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DevicesState.html" data-type="entity-link" >DevicesState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DriveInModel.html" data-type="entity-link" >DriveInModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DriveInResponseModel.html" data-type="entity-link" >DriveInResponseModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DriveInState.html" data-type="entity-link" >DriveInState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DriveOutModel.html" data-type="entity-link" >DriveOutModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DriveOutResponseModel.html" data-type="entity-link" >DriveOutResponseModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DriveOutState.html" data-type="entity-link" >DriveOutState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ErrorModel.html" data-type="entity-link" >ErrorModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HomeState.html" data-type="entity-link" >HomeState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/jwtToken.html" data-type="entity-link" >jwtToken</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/KeyFeatures.html" data-type="entity-link" >KeyFeatures</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoginModel.html" data-type="entity-link" >LoginModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoginResponseModel.html" data-type="entity-link" >LoginResponseModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LogsEntities.html" data-type="entity-link" >LogsEntities</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OrganisationModel.html" data-type="entity-link" >OrganisationModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OrganisationResponseModel.html" data-type="entity-link" >OrganisationResponseModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OrganizationsState.html" data-type="entity-link" >OrganizationsState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PaymentChannelsModel.html" data-type="entity-link" >PaymentChannelsModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PriceGroupDetail.html" data-type="entity-link" >PriceGroupDetail</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PriceScheduleModel.html" data-type="entity-link" >PriceScheduleModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PriceScheduleModel-1.html" data-type="entity-link" >PriceScheduleModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PriceScheduleResponseModel.html" data-type="entity-link" >PriceScheduleResponseModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PricingModel.html" data-type="entity-link" >PricingModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PricingResponseModel.html" data-type="entity-link" >PricingResponseModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProfileResponseModel.html" data-type="entity-link" >ProfileResponseModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RegisterModel.html" data-type="entity-link" >RegisterModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RegisterResponseModel.html" data-type="entity-link" >RegisterResponseModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SpaceImages.html" data-type="entity-link" >SpaceImages</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SpaceModel.html" data-type="entity-link" >SpaceModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SpaceModelResponse.html" data-type="entity-link" >SpaceModelResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SpacesEntities.html" data-type="entity-link" >SpacesEntities</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TokenModel.html" data-type="entity-link" >TokenModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserModel.html" data-type="entity-link" >UserModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/WCNModal.html" data-type="entity-link" >WCNModal</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});