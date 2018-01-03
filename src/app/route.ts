import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { QuantitativeUrineAnalysisComponent } from './quantitative-urine-analysis/quantitative-urine-analysis.component';
import { SubstanceMonitoringComponent } from './substance-monitoring/substance-monitoring.component';
import { PharmacogeneticComponent } from './pharmacogenetic/pharmacogenetic.component';
import { EssentialWellnessComponent } from './essential-wellness/essential-wellness.component';
import { AllergenImmunotherapyComponent } from './allergen-immunotherapy/allergen-immunotherapy.component';
import { AllergyFingerPrickTestComponent } from './allergy-finger-prick-test/allergy-finger-prick-test.component';
import { LoginComponent } from './login/login.component';
import { AddadminComponent } from './addadmin/addadmin.component';
import { AdminlistComponent } from './adminlist/adminlist.component';
import { EditadminComponent } from './editadmin/editadmin.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { AccesscodeComponent } from './accesscode/accesscode.component';
import { NewpasswordComponent } from './newpassword/newpassword.component';
import { BlogcategoryaddComponent } from './blogcategoryadd/blogcategoryadd.component';
import { BlogcategorylistComponent } from './blogcategorylist/blogcategorylist.component';
import { BlogcategoryeditComponent } from './blogcategoryedit/blogcategoryedit.component';
import { BlogmanagementaddComponent } from './blogmanagementadd/blogmanagementadd.component';
import { BlogmanagementlistComponent } from './blogmanagementlist/blogmanagementlist.component';
import { BlogmanagementeditComponent } from './blogmanagementedit/blogmanagementedit.component';


const appRoutes: Routes = [
    { path: '', component: IndexComponent},
    { path: 'quantitative_urine_analysis', component: QuantitativeUrineAnalysisComponent},
    { path: 'SubstanceMonitoringComponent', component: SubstanceMonitoringComponent},
    { path: 'pharmacogenetic', component: PharmacogeneticComponent},
    { path: 'essential_wellness', component: EssentialWellnessComponent},
    { path: 'allergen_immunotherapy', component: AllergenImmunotherapyComponent},
    { path: 'allergy_finger_prick_test', component: AllergyFingerPrickTestComponent},
    { path: 'login', component: LoginComponent},
    { path: 'addadmin', component: AddadminComponent},
    { path: 'adminlist', component: AdminlistComponent},
    { path: 'editadmin/:id', component: EditadminComponent},
    { path: 'changepassword', component: ChangepasswordComponent},
    { path: 'forgetpassword', component: ForgetpasswordComponent},
    { path: 'accesscode', component: AccesscodeComponent},
    { path: 'newpassword', component: NewpasswordComponent},
    { path: 'blogcategoryadd', component: BlogcategoryaddComponent},
    { path: 'blogcategorylist', component: BlogcategorylistComponent},
    { path: 'blogcategoryedit/:id', component: BlogcategoryeditComponent},
    { path: 'blogmanagementadd', component: BlogmanagementaddComponent},
    { path: 'blogmanagementlist', component: BlogmanagementlistComponent},
    { path: 'blogmanagementedit/:id', component: BlogmanagementeditComponent},
];


export const appRoutingProviders: any[] = [
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes,{ useHash: true });