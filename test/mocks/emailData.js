var _ = require('lodash');
var Submission = require('../../models').sequelize.model('submission');

exports = module.exports = function(emailTemplate, overrides) {
  var overrides = overrides || {};
  var sendLead = {
    "selectedPrograms": [
      {
        "benefitName": 108,
        "benefitType": [
          "incentive"
        ],
        "id": 108,
        "title": "Manufactura de ropa y productos an\u00e1logos",
        "purpose": [
          "other",
          "materiaprimaadquisicinymejorasedificiomaquinariayequiposarrendamientoasistenciatcnicanminaenproduccinmercadeoypromocininteresesdeprstamos"
        ],
        "eligibleBusinessLocation": [
          "anywhere_in_pr"
        ],
        "paperworkRequired": [
          "Solicitud notariada; Documentos de la empresa: ventas",
          " operaciones y finanzas; y Documentaci\u00f3n gubernamental"
        ],
        "applicationCost": 0,
        "applicationDeadline": "2020-12-31T00:00:00.000Z",
        "avgApplicationTime": "5 a 30 d\u00edas laborables",
        "benefitDescription": "Programa e Incentivos Econ\u00f3micos Especiales para la Industria Puertorrique\u00f1a de Manufactura de Ropa y Productos An\u00e1logos",
        "agencyId": 57,
        "agencyContactName": "Zenaida Solis",
        "agencyContactEmail": "max@maksimize.com",
        "agencyContactPhone": "(787) 758-4747",
        "minimumYearsInBusiness": 3,
        "eligibleEntityTypes": [
          "for_profit"
        ],
        "currentEmployeesRequired": [
          "6_25"
        ],
        "annualRevenue": [
          "any"
        ],
        "eligibleIndustries": [
          "31-33"
        ],
        "gender": "any",
        "age": [
          0
        ],
        "additionalDemographics": [
          "any"
        ],
        "additionalGeneralInformation": "Empresa tiene que ser promovida por la Compa\u00f1\u00eda de Fomento Industrial de Puerto Rico. Ley N\u00fam. 8 del 2 de cotubre de 1986",
        "investingOwnMoney": "true",
        "moneyInvested": "variable",
        "creatorId": 17,
        "createdAt": "2014-09-11T16:06:13.919Z",
        "updatedAt": "2014-09-11T16:58:41.064Z",
        "agency": {
          "id": 57,
          "name": "Compa\u00f1\u00eda de Fomento Industrial (Dpto. Desarrollo Econ\u00f3mico)",
          "mission": "Ley N\u00fam. 203 de 29 de diciembre de 1997, seg\u00fan enmendada, derog\u00f3 la Ley N\u00fam. 423 de 14 de mayo de 1950, seg\u00fan enmendada y transfiri\u00f3 todos los poderes, facultades, y funciones de la Administraci\u00f3n de Fomento Econ\u00f3mico a la Compa\u00f1\u00eda de Fomento Industrial. Plan de Reorganizaci\u00f3n N\u00fam. 4 de 22 de junio de 1994, crea el Departamento de Desarrollo Econ\u00f3mico y Comercio y se adscribe la Compa\u00f1\u00eda de Fomento Industrial. Ley N\u00fam. 188 de 11 de mayo de 1942, seg\u00fan enmendada. Crear y retener empleos para mejorar nuestra calidad de vida.",
          "phone": "764-1175 \/ 753-6874",
          "fax": "(787) 764-1415",
          "email": null,
          "address": "355 Ave. F.D. Roosevelt, Edif. Formento Industrial, Suite 404",
          "municipality": "Hato Rey",
          "state": null,
          "zip": "0",
          "web": "http:\/\/www.pridco.pr.gov",
          "creatorId": 1,
          "createdAt": "2014-09-10T19:58:25.410Z",
          "updatedAt": "2014-09-10T19:58:25.410Z"
        },
        "requirements": [

        ],
        "quantity": 1
      },
      {
        "benefitName": 109,
        "benefitType": [
          "incentive"
        ],
        "id": 109,
        "title": "Preferencia local en compra del gobierno del esdado libre asociado de puerto rico",
        "purpose": [
          "other",
          "ventadeproductosyserviciosalgobiernodelesdadolibreasociadodepuertorico"
        ],
        "eligibleBusinessLocation": [
          "anywhere_in_pr"
        ],
        "paperworkRequired": [
          "Solicitud; Documentos de la empresa y Documentaci\u00f3n gubernamental"
        ],
        "applicationCost": 0,
        "applicationDeadline": "2020-12-31T00:00:00.000Z",
        "avgApplicationTime": "5 a 30 d\u00edas laborables",
        "benefitDescription": "Oportunidad para vender productos y servicios Gobierno del Esdado Libre Asociado de Puerto Rico",
        "agencyId": 57,
        "agencyContactName": "Zenaida Solis",
        "agencyContactEmail": "max@maksimize.com",
        "agencyContactPhone": "(787) 758-4747",
        "minimumYearsInBusiness": 0,
        "eligibleEntityTypes": [
          "for_profit"
        ],
        "currentEmployeesRequired": [
          "6_25"
        ],
        "annualRevenue": [
          "any"
        ],
        "eligibleIndustries": [
          "31-33",
          "other"
        ],
        "gender": "any",
        "age": [
          0
        ],
        "additionalDemographics": [
          "any"
        ],
        "additionalGeneralInformation": "Empresa tiene que ser promovida por la Compa\u00f1\u00eda de Fomento Industrial de Puerto Rico.",
        "investingOwnMoney": "true",
        "moneyInvested": "variable",
        "creatorId": 17,
        "createdAt": "2014-09-11T16:11:58.041Z",
        "updatedAt": "2014-09-11T16:59:01.086Z",
        "agency": {
          "id": 57,
          "name": "Compa\u00f1\u00eda de Fomento Industrial (Dpto. Desarrollo Econ\u00f3mico)",
          "mission": "Ley N\u00fam. 203 de 29 de diciembre de 1997, seg\u00fan enmendada, derog\u00f3 la Ley N\u00fam. 423 de 14 de mayo de 1950, seg\u00fan enmendada y transfiri\u00f3 todos los poderes, facultades, y funciones de la Administraci\u00f3n de Fomento Econ\u00f3mico a la Compa\u00f1\u00eda de Fomento Industrial. Plan de Reorganizaci\u00f3n N\u00fam. 4 de 22 de junio de 1994, crea el Departamento de Desarrollo Econ\u00f3mico y Comercio y se adscribe la Compa\u00f1\u00eda de Fomento Industrial. Ley N\u00fam. 188 de 11 de mayo de 1942, seg\u00fan enmendada. Crear y retener empleos para mejorar nuestra calidad de vida.",
          "phone": "764-1175 \/ 753-6874",
          "fax": "(787) 764-1415",
          "email": null,
          "address": "355 Ave. F.D. Roosevelt, Edif. Formento Industrial, Suite 404",
          "municipality": "Hato Rey",
          "state": null,
          "zip": "0",
          "web": "http:\/\/www.pridco.pr.gov",
          "creatorId": 1,
          "createdAt": "2014-09-10T19:58:25.410Z",
          "updatedAt": "2014-09-10T19:58:25.410Z"
        },
        "requirements": [

        ],
        "quantity": 1
      },
      {
        "benefitName": 9,
        "benefitType": [
          "incentive"
        ],
        "id": 9,
        "title": "Incentivos contributivos",
        "purpose": [
          "open_location",
          "export",
          "keep_employees",
          "relocate_business"
        ],
        "eligibleBusinessLocation": [
          "caguas"
        ],
        "paperworkRequired": [
          "To attract and retain new companies already established in the city.",
          "Please contact office for requirements"
        ],
        "applicationCost": 200,
        "applicationDeadline": "2017-01-30T00:00:00.000Z",
        "avgApplicationTime": "30 days",
        "benefitDescription": "The new Incentives Code provides fiscal benefits for activities developed in specific areas such as the special development zone of the Traditional Urban Center and the Special Development Corridors, among others which due to their potential for growth and their impact on the economy as a whole are considered a priority. In addition, it provides benefits to more than 21 types of eligible units or businesses.\r\n",
        "agencyId": 1,
        "agencyContactName": "Zamia Baerga",
        "agencyContactEmail": "maksim@maksimize.com",
        "agencyContactPhone": "7876538833",
        "minimumYearsInBusiness": 0,
        "eligibleEntityTypes": [
          "any"
        ],
        "currentEmployeesRequired": [
          "any"
        ],
        "annualRevenue": [
          "any"
        ],
        "eligibleIndustries": [
          "11",
          "42",
          "51",
          "54",
          "56",
          "61",
          "62",
          "48-49",
          "other"
        ],
        "gender": "any",
        "age": [
          0
        ],
        "additionalDemographics": [
          "any"
        ],
        "additionalGeneralInformation": "Disqualifying factors: companies already established in the city that are not planning to grow.  ",
        "investingOwnMoney": "false",
        "moneyInvested": "",
        "creatorId": 8,
        "createdAt": "2014-07-02T18:42:16.317Z",
        "updatedAt": "2014-09-11T22:00:42.098Z",
        "agency": {
          "id": 1,
          "name": "Secretaria de Desarrollo Econ\u00f3mico de Caguas",
          "mission": null,
          "phone": null,
          "fax": null,
          "email": null,
          "address": null,
          "municipality": null,
          "state": null,
          "zip": null,
          "web": null,
          "creatorId": 1,
          "createdAt": "2014-09-10T16:37:30.288Z",
          "updatedAt": "2014-09-10T16:37:30.288Z"
        },
        "requirements": [

        ],
        "quantity": 1
      },
      {
        "benefitName": 10,
        "benefitType": [
          "incentive",
          "expertise"
        ],
        "id": 10,
        "title": "Seminarios",
        "purpose": [
          "open_location",
          "open_franchise",
          "train_employees",
          "working_capital",
          "hire_employees",
          "start_business",
          "export",
          "keep_employees",
          "relocate_business",
          "other"
        ],
        "eligibleBusinessLocation": [
          "caguas"
        ],
        "paperworkRequired": [
          "Llenar perfil empresarial",
          " documento que provee PromoCaguas",
          "para quitar"
        ],
        "applicationCost": 0,
        "applicationDeadline": "2024-06-30T00:00:00.000Z",
        "avgApplicationTime": "Depend on when courses are provided",
        "benefitDescription": "Elegible units can apply for tax break as well as financing through corporations allied to the Municipality.",
        "agencyId": 1,
        "agencyContactName": "Zamia Baerga",
        "agencyContactEmail": "maksim@maksimize.com",
        "agencyContactPhone": "7876538833",
        "minimumYearsInBusiness": 0,
        "eligibleEntityTypes": [
          "any"
        ],
        "currentEmployeesRequired": [
          "any"
        ],
        "annualRevenue": [
          "any"
        ],
        "eligibleIndustries": [
          "any"
        ],
        "gender": "any",
        "age": [
          0
        ],
        "additionalDemographics": [
          "any"
        ],
        "additionalGeneralInformation": "Courses that instruct people to build their business plan.",
        "investingOwnMoney": "false",
        "moneyInvested": "0",
        "creatorId": 8,
        "createdAt": "2014-07-02T18:52:08.980Z",
        "updatedAt": "2014-09-11T22:00:07.612Z",
        "agency": {
          "id": 1,
          "name": "Secretaria de Desarrollo Econ\u00f3mico de Caguas",
          "mission": null,
          "phone": null,
          "fax": null,
          "email": null,
          "address": null,
          "municipality": null,
          "state": null,
          "zip": null,
          "web": null,
          "creatorId": 1,
          "createdAt": "2014-09-10T16:37:30.288Z",
          "updatedAt": "2014-09-10T16:37:30.288Z"
        },
        "requirements": [

        ],
        "quantity": 1
      },
      {
        "benefitName": 47,
        "benefitType": [
          "other"
        ],
        "id": 47,
        "title": "Certificaci\u00f3n de pyme para programa de reservas de compras \"set aside\"",
        "purpose": [
          "anything"
        ],
        "eligibleBusinessLocation": [
          "anywhere_in_pr"
        ],
        "paperworkRequired": [
          "Certificaci\u00f3n del Registro Obligatorio de Comerciantes y de Negocios de la Compa\u00f1\u00eda de Comercio y Exportaci\u00f3n",
          " Declaraci\u00f3n Jurada donde certifique que cumple con los requisitos de elegibilidad",
          " Permiso de Uso de la Administraci\u00f3n de Reglamentos y Permisos (copia)",
          " Registro del Departamento de Estado (si esta incorporado \u2013copia) ",
          " Ultima planilla trimestral del Departamento del Trabajo",
          " Copia de la Planilla ponchada por el Departamento de Hacienda"
        ],
        "applicationCost": 0,
        "applicationDeadline": "2040-12-31T00:00:00.000Z",
        "avgApplicationTime": "depends",
        "benefitDescription": "Beneficios\r\n\r\nEstimula y aumenta las ventas de las peque\u00f1as y medianas empresas (PYMES) puertorrique\u00f1a, fomentando de esta forma la creaci\u00f3n de nuevos empleos.\r\n\r\nEstablece un proceso uniforme y estructurado de la distribuci\u00f3n del presupuesto de compras de las agencias del Gobierno de Puerto Rico.\r\n\r\nFacilita la ejecuci\u00f3n, el cumplimiento y la fiscalizaci\u00f3n del Programa con un mayor grado de eficacia.",
        "agencyId": 7,
        "agencyContactName": "Vilma Yejo",
        "agencyContactEmail": "maksim@codeforamerica.org",
        "agencyContactPhone": "787 294-0101",
        "minimumYearsInBusiness": 0,
        "eligibleEntityTypes": [
          "for_profit",
          "sole_proprietor"
        ],
        "currentEmployeesRequired": [
          "1_5",
          "6_25"
        ],
        "annualRevenue": [
          "0_99999",
          "100000_499999",
          "500000_999999",
          "1000000_4900000"
        ],
        "eligibleIndustries": [
          "any"
        ],
        "gender": "any",
        "age": [
          0
        ],
        "additionalDemographics": [
          "any"
        ],
        "additionalGeneralInformation": "Las empresas interesadas deber\u00e1n estar certificadas como PyME por la Compa\u00f1\u00eda de Comercio y Exportaci\u00f3n de Puerto Rico y deber\u00e1n formar parte del Registro \u00danico de Licitadores (RUL) de la Administraci\u00f3n de Servicios Generales.\r\n\r\n\t\r\n\u00bfQui\u00e9nes Pueden Participar?\r\n\r\nEmpresa independiente donde el 51 % de su capital est\u00e1 en manos de sus gerenciales.\r\nDebe estar incorporado o registrado para hacer negocios en Puerto Rico y que el 51 % o m\u00e1s de sus empleados trabajen en Puerto Rico.\r\nTener menos de 25 empleados a tiempo completo sin incluir trabajadores a tiempo parcial y consultores bajo contratos.\r\nIngreso bruto no puede exceder los $5 millones anuales.",
        "investingOwnMoney": null,
        "moneyInvested": "",
        "creatorId": 7,
        "createdAt": "2014-07-08T06:15:24.372Z",
        "updatedAt": "2014-07-29T23:05:21.549Z",
        "agency": {
          "id": 7,
          "name": "Compa\u00f1ia de Comercio y Exportaci\u00f3n de Puerto Rico (Dpto. Desarrollo Econ\u00f3mico)",
          "mission": "La Ley 323 de 28 de diciembre de 2003, seg\u00fan enmendada, crea la Compa\u00f1\u00eda de Comercio y Exportaci\u00f3n de Puerto Rico (CCE), una corporaci\u00f3n p\u00fablica adscrita al Departamento de Desarrollo Econ\u00f3mico y Comercio de Puerto Rico, (conocida en ingl\u00e9s como Puerto Rico Trade and Export Company).&nbsp; La Ley 323, supra, dispuso los poderes y deberes de la CCE, transfiri\u00f3 las operaciones y activos de la Administraci\u00f3n de Fomento Comercial y de la Corporaci\u00f3n para el Desarrollo de las Exportaciones de Puerto Rico a esta nueva Corporaci\u00f3n.&nbsp;&nbsp;  La Compa\u00f1\u00eda de Comercio y Exportaci\u00f3n es la entidad gubernamental que establece la pol\u00edtica p\u00fablica respecto al desarrollo del comercio, con \u00e9nfasis en las peque\u00f1as y medianas empresas, donde intervienen todos los sectores productivos de la Isla, incluyendo el de las organizaciones sin fines de lucro, para que sean competitivas tanto a nivel local como internacional, con el prop\u00f3sito de fortalecer la econom\u00eda de Puerto Rico y propiciar la creaci\u00f3n y retenci\u00f3n de empleos.",
          "phone": "787-282-7753",
          "fax": "(787) 294-0718",
          "email": "pedro.galarza@cce.pr.gov",
          "address": "Edif. New San Juan 159, Ave. Chard\u00f3n, Hato Rey",
          "municipality": "Hato Rey",
          "state": "PR",
          "zip": "00919-5009",
          "web": "http:\/\/www.comercioyexportacion.com",
          "creatorId": 1,
          "createdAt": "2014-09-10T16:37:30.314Z",
          "updatedAt": "2014-09-10T20:48:43.968Z"
        },
        "requirements": [

        ],
        "quantity": 1
      },
      {
        "benefitName": 48,
        "benefitType": [
          "other"
        ],
        "id": 48,
        "title": "Certificaci\u00f3n de suplidor local para la venta a barcos cruceros",
        "purpose": [
          "anything"
        ],
        "eligibleBusinessLocation": [
          "anywhere_in_pr"
        ],
        "paperworkRequired": [
          "Copia del Certificado del IVU del Departamento de Hacienda",
          " Copia del Registro de Comerciantes de la Compa\u00f1\u00eda de Comercio y Exportaci\u00f3n de Puerto Rico",
          " Permiso de Uso",
          " Patente Municipal",
          " En caso de Corporaciones: \u00daltimo Informe Anual del Departamento de Estado",
          " ponchado",
          " En caso de Corporaciones: Resoluci\u00f3n corporativa indicando nombre",
          " localizaci\u00f3n de la empresa (direcci\u00f3n)",
          " accionistas",
          " residencia de los accionistas y porcentaje de participaci\u00f3n en la corporaci\u00f3n",
          " Si la empresa vende productos manufacturados",
          " deber\u00e1 someter la Certificaci\u00f3n de Fomento Industrial (Evidencia que el producto es manufacturado en Puerto Rico)",
          " Si la empresa vende productos agr\u00edcolas locales",
          " deber\u00e1 proveer evidencia que provienen de n\u00facleos de producci\u00f3n agr\u00edcola certificados por el Departamento de Agricultura"
        ],
        "applicationCost": 0,
        "applicationDeadline": "2034-06-30T00:00:00.000Z",
        "avgApplicationTime": "depends",
        "benefitDescription": "Certificaci\u00f3n como Suplidor Local para venderle a barcos cruceros y as\u00ed aumentar sus ventas.",
        "agencyId": 7,
        "agencyContactName": "Vilma Yejo",
        "agencyContactEmail": "max@maksimize.com",
        "agencyContactPhone": "787 294-0101",
        "minimumYearsInBusiness": 0,
        "eligibleEntityTypes": [
          "for_profit"
        ],
        "currentEmployeesRequired": [
          "any"
        ],
        "annualRevenue": [
          "any"
        ],
        "eligibleIndustries": [
          "agriculture",
          "manufacture"
        ],
        "gender": "any",
        "age": [
          0
        ],
        "additionalDemographics": null,
        "additionalGeneralInformation": "",
        "investingOwnMoney": null,
        "moneyInvested": "",
        "creatorId": 7,
        "createdAt": "2014-07-08T14:56:23.782Z",
        "updatedAt": "2014-07-29T23:04:55.284Z",
        "agency": {
          "id": 7,
          "name": "Compa\u00f1ia de Comercio y Exportaci\u00f3n de Puerto Rico (Dpto. Desarrollo Econ\u00f3mico)",
          "mission": "La Ley 323 de 28 de diciembre de 2003, seg\u00fan enmendada, crea la Compa\u00f1\u00eda de Comercio y Exportaci\u00f3n de Puerto Rico (CCE), una corporaci\u00f3n p\u00fablica adscrita al Departamento de Desarrollo Econ\u00f3mico y Comercio de Puerto Rico, (conocida en ingl\u00e9s como Puerto Rico Trade and Export Company).&nbsp; La Ley 323, supra, dispuso los poderes y deberes de la CCE, transfiri\u00f3 las operaciones y activos de la Administraci\u00f3n de Fomento Comercial y de la Corporaci\u00f3n para el Desarrollo de las Exportaciones de Puerto Rico a esta nueva Corporaci\u00f3n.&nbsp;&nbsp;  La Compa\u00f1\u00eda de Comercio y Exportaci\u00f3n es la entidad gubernamental que establece la pol\u00edtica p\u00fablica respecto al desarrollo del comercio, con \u00e9nfasis en las peque\u00f1as y medianas empresas, donde intervienen todos los sectores productivos de la Isla, incluyendo el de las organizaciones sin fines de lucro, para que sean competitivas tanto a nivel local como internacional, con el prop\u00f3sito de fortalecer la econom\u00eda de Puerto Rico y propiciar la creaci\u00f3n y retenci\u00f3n de empleos.",
          "phone": "787-282-7753",
          "fax": "(787) 294-0718",
          "email": "pedro.galarza@cce.pr.gov",
          "address": "Edif. New San Juan 159, Ave. Chard\u00f3n, Hato Rey",
          "municipality": "Hato Rey",
          "state": "PR",
          "zip": "00919-5009",
          "web": "http:\/\/www.comercioyexportacion.com",
          "creatorId": 1,
          "createdAt": "2014-09-10T16:37:30.314Z",
          "updatedAt": "2014-09-10T20:48:43.968Z"
        },
        "requirements": [

        ],
        "quantity": 1
      },
      {
        "benefitName": 49,
        "benefitType": [
          "loan"
        ],
        "id": 49,
        "title": "Peque\u00f1as hospeder\u00edas",
        "purpose": [
          "anything"
        ],
        "eligibleBusinessLocation": [
          "anywhere_in_pr"
        ],
        "paperworkRequired": [
          "Solicitud debidamente completada",
          "Plan de Negocios",
          "Endoso conceptual y financiero de la Compa\u00f1\u00eda de Turismo. ",
          "Estudio de viabilidad econ\u00f3mica del proyecto, preparado por una firma competente, incluyendo el plan de mercadeo que ser\u00e1 implementado",
          "Detalle por separado de cada uno de los componentes del costo total del proyecto, conjuntamente con el criterio y las bases utilizadas para respaldar su razonabilidad, Porci\u00f3n del costo total a financiar (fuentes y uso de fondos). ",
          "Informaci\u00f3n sobre el due\u00f1o y operador de la hospeder\u00eda y el casino, si lo tiene. Debe incluir la experiencia de los mismos en el negocio, conocimientos y educaci\u00f3n, al igual que otros documentos o referencias que sean de ayuda en nuestra evaluaci\u00f3n. ",
          "Estado financiero pro forma de los primeros cinco a\u00f1os de operaciones de la hospeder\u00eda. ",
          "\u00daltimo estado financiero auditado de los due\u00f1os de la empresa y de la compa\u00f1\u00eda desarrolladora. ",
          "Evidencia de t\u00edtulo de propiedad del terreno donde se va a desarrollar el proyecto, incluyendo una tasaci\u00f3n del mismo. ",
          "Planos arquitect\u00f3nicos preparados por un arquitecto o ingeniero licenciado. ",
          "Ser\u00e1n determinados de acuerdo a los par\u00e1metros establecidos por el BDEPR de tiempo en tiempo.",
          "None",
          "None",
          "None",
          "None",
          "None",
          "None",
          "None",
          "None",
          "None",
          "None",
          "None"
        ],
        "applicationCost": 25,
        "applicationDeadline": "2040-12-31T00:00:00.000Z",
        "avgApplicationTime": "90 d\u00edas",
        "benefitDescription": "\r\nCantidad: \r\n\r\n\u2022Hasta $10,000,000 \r\n\r\nUso de fondos: \r\n\r\n\u2022Capital de operaciones hasta 5 a\u00f1os. \r\n\u2022Compra de maquinaria y equipo hasta 5 a\u00f1os. \r\n\u2022Mejoras permanentes hasta 10 a\u00f1os*. \r\n\u2022Compra o construcci\u00f3n de propiedad inmueble hasta 30 a\u00f1os.*\r\n\r\n*Los financiamientos para mejoras permanentes y construcci\u00f3n ser\u00e1n otorgados por el BDEPR y la CT y ser\u00e1n manejados por la Autoridad para el Financiamiento de la Infraestructura (AFI) u otra entidad privada con experiencia en el manejo de pr\u00e9stamos de construcci\u00f3n. Se establecer\u00e1 un acuerdo entre la CT, la AFI y el BDEPR para establecer los t\u00e9rminos para el manejo de estos financiamientos. \r\n\r\nGastos relacionados: \r\n\r\n\u2022Los gastos legales podr\u00e1n ser financiados. \r\n\r\nTipo de financiamiento: \r\n\r\n\u2022Pr\u00e9stamos en participaci\u00f3n en partes iguales (50%* cada uno) en pari passu con la CT y el BDEPR. La participaci\u00f3n del BDEPR ser\u00e1 hasta un m\u00e1ximo de $10,000,000. Estos financiamientos se podr\u00e1n tramitar a trav\u00e9s del Programa 504 de la Administraci\u00f3n de Peque\u00f1os Negocios (SBA). \r\n\r\n\t*A discreci\u00f3n del BDEPR pudi\u00e9ramos aumentar nuestra participaci\u00f3n en exceso del 50% de ser necesario para la viabilidad del proyecto. \r\n\r\nColateral\/Garant\u00edas: \r\n\r\n\u2022Se considerar\u00e1n los bienes adquiridos con el financiamiento y los bienes del negocio que est\u00e9n libres de grav\u00e1menes. Se tomar\u00e1 UCC Filing general. Adem\u00e1s, el BDEPR, en coordinaci\u00f3n con la CT, evaluar\u00e1 la disponibilidad de otras colaterales, tanto del negocio como de los garantizadores. \r\n\r\nAportaci\u00f3n: \r\n\r\n\u202210% al 20% del costo del proyecto, seg\u00fan sea determinado por las entidades que participen en el financiamiento. \r\n\r\nTasa de inter\u00e9s anual: \r\n\u20226.50% - 10.75% \r\n\r\nTasa de inter\u00e9s ser\u00e1 calculada a base de an\u00e1lisis de riesgo y cr\u00e9dito. La misma podr\u00e1 ser fija o fluctuante. De ser fluctuante podr\u00e1 variar con los cambios de la tasa de inter\u00e9s preferente (prime rate).\r\n\r\nCargo por compromiso: \r\n\r\n\u20221.25% en financiamientos menores de $500,000. \r\n\u20221.50% en financiamientos de $500,000 o m\u00e1s. \r\n\r\nCargo por manejo: \r\n\r\n\u20220.25% en financiamientos menores de $500,000. \r\n\u20220.50% en financiamientos de $500,000 o m\u00e1s.",
        "agencyId": 3,
        "agencyContactName": "Jorge Mart\u00ed",
        "agencyContactEmail": "maksim@codeforamerica.org",
        "agencyContactPhone": "7876414300",
        "minimumYearsInBusiness": 0,
        "eligibleEntityTypes": [
          "for_profit"
        ],
        "currentEmployeesRequired": [
          "any"
        ],
        "annualRevenue": [
          "any"
        ],
        "eligibleIndustries": [
          "other",
          "_aplican_alojamiento_y_desayuno_o_bed_and_breakfast_casa_de_huspedes_o_guest_house_hotel_ecohospederas_agrohospederas_paradores_posadas"
        ],
        "gender": "any",
        "age": [
          0
        ],
        "additionalDemographics": null,
        "additionalGeneralInformation": "Los financiamientos a ser evaluados que est\u00e9n relacionados con el sector econ\u00f3mico de turismo deben recibir el aval de la Compa\u00f1\u00eda de Turismo (CT) antes de la evaluaci\u00f3n del Banco de Desarrollo Econ\u00f3mico para Puerto Rico (BDEPR). En los casos en que se soliciten financiamientos para nuevas hospeder\u00edas o expansi\u00f3n de las existentes, deberemos recibir el endoso financiero de la CT, previo al an\u00e1lisis del BDEPR.",
        "investingOwnMoney": "true",
        "moneyInvested": "10%-20% costo total",
        "creatorId": 6,
        "createdAt": "2014-07-08T15:15:46.010Z",
        "updatedAt": "2014-09-08T14:50:11.356Z",
        "agency": {
          "id": 3,
          "name": "Banco de Desarrollo Econ\u00f3mico (Dpto. Desarrollo Econ\u00f3mico)",
          "mission": "Creado por virtud de la Ley N\u00fam. 22 de 24 de julio de 1985, seg\u00fan enmendada, el Banco es l\u00edder y pionero en proveer innovadores programas de financiamiento a las peque\u00f1as y medianas empresas contribuyendo as\u00ed a la promoci\u00f3n del sector privado de la econom\u00eda de Puerto Rico.<br \/>",
          "phone": "781-0772",
          "fax": "(787) 641-4282",
          "email": "",
          "address": "Calle Aldebar\u00e1n #638,",
          "municipality": "San Juan",
          "state": "AL",
          "zip": "922",
          "web": "http:\/\/www.bde.pr.gov",
          "creatorId": 1,
          "createdAt": "2014-09-10T16:37:30.313Z",
          "updatedAt": "2014-09-10T20:27:47.962Z"
        },
        "requirements": [

        ],
        "quantity": 1
      }
    ],
    "query": {
      "gender": "any",
      "age": "1",
      "purpose": "relocate_business",
      "purposeOther": "",
      "investingOwnMoney": "1",
      "moneyInvested": "33",
      "businessType": "for_profit",
      "industry": "23",
      "businessLocation": "anywhere_in_pr",
      "employeeNumber": "6_25",
      "yearsInBusiness": "3",
      "annualRevenue": "100000_499999"
    },
    "submitter": {
      "_csrf": "dSUBX9vOgevkZp9+hYNdtnv5+Fn7yOpZhdle4=",
      "name": "Maksim Pecherskiy",
      "phone": "17736777755",
      "email": "maxp37@maxp37.com",
      "address": "1134 Wildberry Ct",
      "municipality": "Caguas",
      "state": "IL",
      "zip": "60090",
      "areYouInc": "0",
      "legalCompanyName": "",
      "bizAddress": "",
      "bizMunicipality": "",
      "bizState": "PR",
      "bizZip": ""
    }
  };

  var body = {};

  // Allow mock switches.
  if (emailTemplate === 'sendlead-agency' || emailTemplate === 'sendlead-customer') {
    var subSaveData = _.extend(sendLead.query, _.omit(sendLead.submitter, ['_csrf']));
    sendLead.subSaveData = Submission.buildFromAdminForm(subSaveData).modelData;
    body = sendLead;
  }

  return _.extend(body, overrides);
}
