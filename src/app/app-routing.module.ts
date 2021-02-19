import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { HomesComponent } from './homes/homes.component';
import { SavedPropertiesComponent } from "./saved-properties/saved-properties.component";


const appRoutes: Routes = [
    { path: "", component: HomeComponent },
    {path: "homes", component: HomesComponent},
    {path: "saved-properties", component: SavedPropertiesComponent}
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}