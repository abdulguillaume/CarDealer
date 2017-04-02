namespace CarDealer.Controllers {

    export class HomeController {
        public message = 'Hello from the home page!';
        public cars;
        public makes; //for later

        constructor(private carService: CarDealer.Services.CarService, private makeService: CarDealer.Services.MakeService, private $uibModal: angular.ui.bootstrap.IModalService) {
            this.cars = carService.listCars();
            this.makes = makeService.listMakes();

        }

        public showModal(carId: number) {

            let car = this.cars.find(x => x.id == carId);
            let make = this.makes.find(x => x.id == car.carMakeId);

            console.log(make);
            this.$uibModal.open({
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



    export class AboutController {
        public message = 'Hello from the about page!';
    }

}
