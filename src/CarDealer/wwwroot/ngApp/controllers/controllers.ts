namespace CarDealer.Controllers {

    export class HomeController {
        //public message = 'Hello from the home page!';
        public cars;
        public makes; //for later
        public selectedMake = 0;

        constructor(private carService: CarDealer.Services.CarService, private makeService: CarDealer.Services.MakeService, private $uibModal: angular.ui.bootstrap.IModalService) {
            this.cars = carService.listCars();
            this.makes = makeService.listMakes();

        }

        public getCars() {
            if (this.selectedMake == 0)
                return this.cars
            else
                return this.cars.filter(x => x.carMakeId == this.selectedMake);
        }

        public showModal(carId) {
            showModalUI(carId, this.$uibModal, this.cars, this.makes)
        }
        //public showModal(carId: number) {

        //    let car = this.cars.find(x => x.id == carId);
        //    let make = this.makes.find(x => x.id == car.carMakeId);

        //    //console.log(make);

        //    this.$uibModal.open({
        //        templateUrl: '/ngApp/views/dialog.html',
        //        controller: 'DialogController',
        //        controllerAs: 'modal',
        //        resolve: {
        //            car: () => car,
        //            make: () => make.name
        //        },
        //        size: 'lg'
        //    });
        //}

        //public getMake(carMakeId) {
        //    return this.makeService.getMake(carMakeId);
        //}
    }


    class DialogController {

        public ok() {
            this.$uibModalInstance.close();
        }

        constructor(public make: string, public car: object, private $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance) { }
    }

    angular.module('CarDealer').controller('DialogController', DialogController);


    const apiUrl = '/api/cars/search/';

    export class AboutController {
        //public message = 'Hello from the about page!';
        public cars;
        public makes;
        public search;


        fetch(){
            if (this.search) {
                this.$http.get(apiUrl + this.search)
                    .then(res => {
                        this.cars = res.data;
                    });
            }
        }

        public showModal(carId) {
            showModalUI(carId, this.$uibModal, this.cars, this.makes)
        }

        constructor(private makeService: CarDealer.Services.MakeService, private $http: ng.IHttpService, private $uibModal: angular.ui.bootstrap.IModalService) {
            this.makes = makeService.listMakes();
        } 
    }

    export function showModalUI(carId: number, $uibModal: angular.ui.bootstrap.IModalService, cars, makes) {

        let car = cars.find(x => x.id == carId);
        let make = makes.find(x => x.id == car.carMakeId);

        //console.log(make);

        $uibModal.open({
            templateUrl: '/ngApp/views/dialog.html',
            controller: 'DialogController',
            controllerAs: 'modal',
            resolve: {
                car: () => car,
                make: () => make.name
            },
            size: 'lg'
        });
    }

}
