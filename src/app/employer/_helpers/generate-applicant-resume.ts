import { AdsListResolverService } from '@app/_resolvers/admin-resolvers/ads-list-resolver.service';
export function generateResume(applicant) {
  var dd = {
    info: {
      title: applicant.user.firstName + ' ' + applicant.user.lastName + '  Resume'
    },
    content: [
      {
        text: 'Resume',
        style: 'header',
        alignment: 'center',
        margin: [0, 0, 0, 20]
      },
      {
        text: [
          { text: 'Name:    ', style: 'label' },
          { text: applicant.user.firstName + ' ' + applicant.user.lastName + '\n', style: 'value' },
          { text: 'Email:    ', style: 'label' },
          { text: applicant.user.email + '\n', style: 'value' },
          { text: 'Gender:    ', style: 'label' },
          { text: applicant.gender + '\n', style: 'value' },
          { text: 'Date of Birth:    ', style: 'label' },
          { text: applicant.dateOfBirth + '\n', style: 'value' }
        ],
        margin: [0, 0, 0, 20]
      },
      {
        text: [
          { text: 'Address:    ', style: 'label' },
          { text: applicant.address + '\n', style: 'value' },
          { text: 'Phone Number:    ', style: 'label' },
          { text: applicant.user.phoneNumber + '\n', style: 'value' }
        ],
        margin: [0, 0, 0, 20]
      },
      { text: 'Self Description: ', style: 'subHeader' },
      {
        text: [applicant.selfDescription],
        style: 'selfDescription',
        bold: false,
        margin: [0, 0, 0, 20]
      },
      {
        text: [
          { text: 'Current Employer:    ', style: 'label' },
          { text: applicant.currentEmployer + '\n', style: 'value' },
          { text: 'Current Occopation:    ', style: 'label' },
          { text: applicant.currentOccopation + '\n', style: 'value' }
        ],
        margin: [0, 0, 0, 20]
      }
    ],
    styles: {
      header: {
        fontSize: 20,
        bold: true,
        alignment: 'justify'
      },
      subHeader: {
        fontSize: 13,
        bold: true
      },
      selfDescription: {
        fontSize: 12,
        alignment: 'justify',
        color: '#555'
      },
      label: {
        fontSize: 12,
        bold: true
      },
      value: {
        fontSize: 12,
        color: '#555'
      }
    }
  };

  return dd;
}
