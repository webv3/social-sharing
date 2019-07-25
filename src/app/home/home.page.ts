import { Component, OnInit, ViewChild } from '@angular/core';

import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import domtoimage from 'dom-to-image';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    @ViewChild('container') container;

    imagem: any = "";
    imageSrc: any = "";

    constructor(
        private socialSharing: SocialSharing,
    ) {
        // Check if sharing via email is supported
        this.socialSharing.canShareViaEmail().then(() => {
            console.log("Email disponivel");
        }).catch((err) => {
            console.log("Email NÃO disponivel", err);
        });

        this.imagem = new Image();
    }



    ngOnInit() {
        let _this = this;

        setTimeout(() => domtoimage.toPng(this.container.nativeElement, { quality: 0.15 }).then(function (dataUrl) {

            _this.imagem.src = dataUrl;
            _this.imageSrc = dataUrl;

        }).catch(function (error) {
            console.error('oops, something went wrong!', error);
        }), 1000);
    }



    share(tipo = "email") {

        if (tipo == "email") {
            this.socialSharing.shareViaEmail('Body', 'Subject', ['recipient@example.org']);
        } else if (tipo == "facebook") {
            this.socialSharing.shareViaFacebook("Menssagem de compartilhamento no facebook", this.imageSrc)
        } else if (tipo == "twitter") {
            this.socialSharing.shareViaTwitter("Lorem isum dolore", this.imageSrc);
        } else if (tipo == "twitter2") {
            this.socialSharing.shareViaTwitter("Lorem isum dolore", this.imagem);
        } else if (tipo == "whatsapp") {
            this.socialSharing.shareViaWhatsApp("Lorem isum dolore", this.imageSrc);
        }

    }

}
