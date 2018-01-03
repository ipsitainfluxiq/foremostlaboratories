import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CKEditorModule } from 'ng2-ckeditor';
import {appRoutingProviders, routing} from './route';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
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
import { AdminheaderComponent } from './adminheader/adminheader.component';
import { AdminleftsidebarComponent } from './adminleftsidebar/adminleftsidebar.component';
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
import { ModalModule } from 'ngx-bootstrap/modal';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { OrderBy } from './orderby';
import { UsersearchPipe } from './search.pipe';
import { Ng2UploaderModule } from 'ng2-uploader';

@NgModule({
    declarations: [
        AppComponent,
        IndexComponent,
        HeaderComponent,
        FooterComponent,
        QuantitativeUrineAnalysisComponent,
        SubstanceMonitoringComponent,
        PharmacogeneticComponent,
        EssentialWellnessComponent,
        AllergenImmunotherapyComponent,
        AllergyFingerPrickTestComponent,
        LoginComponent,
        AddadminComponent,
        AdminlistComponent,
        EditadminComponent,
        AdminheaderComponent,
        AdminleftsidebarComponent,
        OrderBy,
        UsersearchPipe,
        ChangepasswordComponent,
        ForgetpasswordComponent,
        AccesscodeComponent,
        NewpasswordComponent,
        BlogcategoryaddComponent,
        BlogcategorylistComponent,
        BlogcategoryeditComponent,
        BlogmanagementaddComponent,
        BlogmanagementlistComponent,
        BlogmanagementeditComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        routing,
        ModalModule.forRoot(),
        CKEditorModule,
        Ng2UploaderModule
    ],
    providers: [appRoutingProviders, CookieService],
    bootstrap: [AppComponent]
})
export class AppModule { }
