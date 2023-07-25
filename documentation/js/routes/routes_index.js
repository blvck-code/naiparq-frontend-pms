var ROUTES_INDEX = {
  name: "<root>",
  kind: "module",
  className: "AppModule",
  children: [
    {
      name: "routes",
      filename: "src/app/app-routing.module.ts",
      module: "AppRoutingModule",
      children: [
        {
          path: "",
          loadChildren: "./home/home.module#HomeModule",
          children: [
            {
              kind: "module",
              children: [
                {
                  name: "homeRoutes",
                  filename: "src/app/home/home-routing.module.ts",
                  module: "HomeRoutingModule",
                  children: [
                    {
                      path: "",
                      component: "HomeComponent",
                      children: [
                        { path: "", component: "LandingComponent" },
                        { path: "about-us", component: "AboutComponent" },
                        { path: "contact-us", component: "ContactComponent" },
                        {
                          path: "parking-management-system",
                          component: "PmsComponent",
                        },
                        {
                          path: "parking-reservation",
                          component: "ReservationComponent",
                        },
                        {
                          path: "blog",
                          component: "BlogComponent",
                          children: [
                            { path: "", component: "BlogListComponent" },
                            {
                              path: "create",
                              component: "BlogCreateComponent",
                              canActivate: ["BloggerGuard"],
                            },
                            {
                              path: "create/:id",
                              component: "BlogCreateComponent",
                              canActivate: ["BloggerGuard"],
                            },
                            { path: ":slug", component: "BlogDetailComponent" },
                          ],
                        },
                      ],
                    },
                  ],
                  kind: "module",
                },
              ],
              module: "HomeModule",
            },
          ],
        },
        { path: "", loadChildren: "./auth/auth.module#AuthModule" },
        {
          path: "dashboard",
          loadChildren: "./dashboard/dashboard.module#DashboardModule",
          children: [
            {
              kind: "module",
              children: [
                {
                  name: "dashRoutes",
                  filename: "src/app/dashboard/dashboard-routing.module.ts",
                  module: "DashboardRoutingModule",
                  children: [
                    { path: "", redirectTo: "premises", pathMatch: "full" },
                    {
                      path: "",
                      component: "DashboardComponent",
                      canActivate: ["AuthGuard"],
                      children: [
                        { path: "", component: "DashComponent" },
                        { path: "premises", component: "PremisesComponent" },
                        { path: "logs", component: "LogsComponent" },
                        { path: "revenues", component: "RevenuesComponent" },
                        { path: "analytics", component: "AnalyticsComponent" },
                        {
                          path: "notifications",
                          component: "NotificationsComponent",
                        },
                        {
                          path: "staff-visitor",
                          component: "DriveInComponent",
                        },
                        {
                          path: "motorist-management",
                          component: "MotoristManagementComponent",
                        },
                        {
                          path: "user-management",
                          component: "UserManagementComponent",
                          canActivate: ["AdminGuard"],
                        },
                        { path: "settings", component: "SettingsComponent" },
                        { path: "account", component: "AccountComponent" },
                        {
                          path: "asset-management",
                          component: "AssetsManagementComponent",
                          canActivate: ["AdminGuard"],
                        },
                      ],
                    },
                  ],
                  kind: "module",
                },
              ],
              module: "DashboardModule",
            },
          ],
        },
        { path: "checkout", component: "DriveOutComponent" },
        { path: "bill/:billId", component: "BillingComponent" },
        { path: "**", component: "PageNotFoundComponent" },
      ],
      kind: "module",
    },
    {
      name: "routes",
      filename: "src/app/auth/auth-routing.module.ts",
      module: "AuthRoutingModule",
      children: [
        {
          path: "auth",
          component: "AuthComponent",
          children: [
            { path: "", component: "LoginComponent" },
            { path: "register", component: "RegisterComponent" },
            { path: "password_reset", component: "ResetComponent" },
            { path: "confirm_reset", component: "ConfirmResetComponent" },
            { path: "verify", component: "VerifyComponent" },
          ],
        },
      ],
      kind: "module",
    },
  ],
};
