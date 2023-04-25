import { Component } from '@angular/core';

interface KeyFeatures {
  icon: string;
  title: string;
  desc: string;
}

interface WCNModal {
  title: string;
  desc: string;
}

@Component({
  selector: 'app-pms',
  templateUrl: './pms.component.html',
  styleUrls: ['./pms.component.scss'],
})
export class PmsComponent {
  selectedWCN: number = 0;

  wcnContent: WCNModal[] = [
    {
      title: 'Customizable',
      desc: 'We can customize the Parking Management Solution to the needs of your business.',
    },
    {
      title: 'Transparent',
      desc: 'We can customize the Parking Management Solution to the needs of your business.',
    },
    {
      title: 'No Revenue Leakages',
      desc: 'We can customize the Parking Management Solution to the needs of your business.',
    },
    {
      title: 'Convenience',
      desc: 'We can customize the Parking Management Solution to the needs of your business.',
    },
    {
      title: 'Secure',
      desc: 'We can customize the Parking Management Solution to the needs of your business.',
    },
  ];

  keyFeatures: KeyFeatures[] = [
    {
      icon: '/assets/images/icons/naiparq-camera-icon.png',
      title: 'Automated License Plate Recognition',
      desc:
        "Naiparq's License Plate Recognition " +
        'system delivers a seamless parking experience f' +
        'or authorized vehicles, utilizing cameras and ' +
        'software to quickly and accurately grant access ' +
        'while minimizing the risk of unauthorized entry or exit.',
    },
    {
      icon: '/assets/images/icons/naiparq-plate-icon.png',
      title: 'License Plate Inventory',
      desc:
        'The License Plate Inventory provides ' +
        'valuable insights on parking habits to ' +
        'facility managers. With its Blacklist ' +
        'feature, it can block entry of certain ' +
        'plates and alert administrators of any ' +
        'attempts. This ensures greater security ' +
        'and control over the parking facility.',
    },
    {
      icon: '/assets/images/icons/naiparq-barrier-icon.png',
      title: 'Parking access control',
      desc:
        'Implementing entry/exit authorizations ' +
        'ensures only authorized vehicles enter/exit ' +
        'designated parking areas, enhancing facility ' +
        'security, reducing unauthorized access risk, ' +
        'preventing breaches, improving parking control, ' +
        'and providing a safer environment for visitors ' +
        'and employees.',
    },
    {
      icon: '/assets/images/icons/naiparq-tenant-icon.png',
      title: 'Express Entry for Seasonal Clients/Tenants',
      desc:
        'Express Entry provides seasonal clients/tenants ' +
        "with fast access to the parking facility they've " +
        "prepaid for, ideal for frequent visits. They won't " +
        'have to waste time in line or at the pay station, ' +
        'enhancing their parking experience and increasing satisfaction.',
    },
    {
      icon: '/assets/images/icons/naiparq-report-icon.png',
      title: 'Transactional reporting',
      desc:
        'Enables data collection and reporting through ' +
        'dashboards with charts for easier analysis and ' +
        'decision-making. NaiparQ can also integrate into ' +
        'your existing Business Intelligence systems, ' +
        'simplifying data analysis and rationalization ' +
        'for policy and decision-making.',
    },
    {
      icon: '/assets/images/icons/naiparq-pay-icon.png',
      title: 'Payments – For commercialized Parking Spaces',
      desc:
        'Our payment system offers cashless options via mobile ' +
        'money or cards, with customization available. For cash ' +
        'payments, we offer a designated autopay station or ' +
        'handheld POS system for easy and convenient transactions.',
    },
    {
      icon: '/assets/images/icons/naiparq-dash-icon.png',
      title: 'User Interface Dashboard',
      desc:
        'The parking facility personnel can access detailed ' +
        'insights on facility usage, receive alerts on any ' +
        'anomalies, and take necessary action. Additionally, ' +
        'the facility owner can track performance metrics ' +
        'through the dashboard, ensuring efficient parking management.',
    },
    {
      icon: '/assets/images/icons/naiparq-iot-icon.png',
      title: 'Integration of other IOT Devices',
      desc:
        'The parking management system allows for ' +
        'integration of the IOT devices to enable ' +
        'guidance capabilities such as adaptive lighting ' +
        'sensors, parking space indicators and indoor ' +
        'positioning systems, to provide comprehensive service.',
    },
  ];

  handleActiveWCN(index: number): void {
    this.selectedWCN = index;
  }
}
