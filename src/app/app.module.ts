import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';
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
// import { AddvideomanagerComponent } from './addvideomanager/addvideomanager.component';
import { VideomanageraddComponent } from './videomanageradd/videomanageradd.component';
import { VideomanagerlistComponent } from './videomanagerlist/videomanagerlist.component';
import { VideomanagereditComponent } from './videomanageredit/videomanageredit.component';
import { DoctoraddComponent } from './doctoradd/doctoradd.component';
import { DoctorlistComponent } from './doctorlist/doctorlist.component';
import { DoctoreditComponent } from './doctoredit/doctoredit.component';
import { RepresentativelistComponent } from './representativelist/representativelist.component';
import { DoctoraddnoteComponent } from './doctoraddnote/doctoraddnote.component';
import { DoctorviewnoteComponent } from './doctorviewnote/doctorviewnote.component';
import { DashboardmessageaddComponent } from './dashboardmessageadd/dashboardmessageadd.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllblogsComponent } from './allblogs/allblogs.component';
import { BlogpostdetailComponent } from './blogpostdetail/blogpostdetail.component';
import { RepdetailinfoComponent } from './repdetailinfo/repdetailinfo.component';
import { CancerScreeningComponent } from './cancer-screening/cancer-screening.component';
import { FilemanageraddComponent } from './filemanageradd/filemanageradd.component';
import { FilemanagerlistComponent } from './filemanagerlist/filemanagerlist.component';
import { FilemanagereditComponent } from './filemanageredit/filemanageredit.component';

import { ModalModule } from 'ngx-bootstrap/modal';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { OrderBy } from './orderby';
import { UsersearchPipe } from './search.pipe';
import { Ng2UploaderModule } from 'ng2-uploader';
import { NgUploaderModule } from 'ngx-uploader';
import {DatepickerModule} from 'ngx-bootstrap/datepicker';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { CKEditorModule } from 'ng2-ckeditor';
import {ScrollToModule} from 'ng2-scroll-to';
import { Ng2ScrollableModule } from 'ng2-scrollable';

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
        BlogmanagementeditComponent,
       // AddvideomanagerComponent,
        VideomanageraddComponent,
        VideomanagerlistComponent,
        VideomanagereditComponent,
        DoctoraddComponent,
        DoctorlistComponent,
        DoctoreditComponent,
        RepresentativelistComponent,
        DoctoraddnoteComponent,
        DoctorviewnoteComponent,
        DashboardmessageaddComponent,
        DashboardComponent,
        AllblogsComponent,
        BlogpostdetailComponent,
        RepdetailinfoComponent,
        CancerScreeningComponent,
        FilemanageraddComponent,
        FilemanagerlistComponent,
        FilemanagereditComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        routing,
        ModalModule.forRoot(),
        Ng2UploaderModule,
        NgUploaderModule,
        DatepickerModule.forRoot(),
        BsDatepickerModule.forRoot(),
        Ng2AutoCompleteModule,
        CKEditorModule,
        ScrollToModule.forRoot(),
        Ng2ScrollableModule
    ],
    providers: [appRoutingProviders, CookieService],
    bootstrap: [AppComponent]
})
export class AppModule { }
