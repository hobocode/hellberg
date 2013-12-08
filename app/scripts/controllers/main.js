'use strict';

angular.module('hellbergApp')
  .controller('MainCtrl', ['$scope', '$location', function($scope, $location) {
    $scope.img_index = '0' + Math.floor(Math.round(Math.random() * 9));
    $scope.detail1 = null;
    $scope.detail2 = null;
    $scope.options = { types: '(cities)' };

    $scope.trip = function() {
      if (!$scope.detail1 || !$scope.detail2) {
        alert('Fill in both locations');
      } else {
        $location.path('/trip/' + $scope.detail1.reference + '/' + $scope.detail2.reference + '/');
      }
    };

    $scope.random = function() {
      var trips = [
        [ // Berlin-Düsseldorf
          'CoQBcgAAALrzKujSCi9rSiQ9Wgrs-SBHmUnvrCq8QzsMxqQv4KusGzTLcAZ96ZqxSGATL2EIEr95P17nO1DG8wW-drh-2Ij6Wkkk_Jr9XuKximoKE0HCZuQ7O2nDY7IpgFxHsHzb4pBPmklDr8_Hc4uGeexxSmUi9ArM3enuvZirJ0yEOpSyEhDIu_10N0PU7-d49nYgH4k9GhQrKv2_LeI8KbfXQbRDRidkRFtf6g',
          'CoQBdgAAAJvNJN5K76_Oh2aJoSbpsNV8b_wLEhtbU3E4yg769Rb7Q7LwUTEJuqrEc_-UvNjMFw-rd8MWvFav0E6lUEjK6rzn_qeZgAAYxCzyEuunKg5qbW0Ha59eo8K7D9YlyUHYVqJS82_HX4snzG7nzBUvOzXvmWcDl6nKuk2T6MRYmoSdEhB0XMVZnhJsQHSOWKZnZjRGGhRc9iUByrDmgOubD_YHDbaEyUMOHA'
        ],
        [ // Malmö-Lund
          'CoQBcQAAAKcfVqHWQrV9kZg5BEj3ik9ihOaWm1h3yQeEblDqHFNcrLrzKLGwRD-DLdOTRzkn_NPyBaS1xws37gcaGjImSIQvhhbWKrVZgRmgdCa4n1bj8Tlz8ic-3AJB3WfbwMuOoNRjgiSJF7ED3-KkgivXA0w7bm7Lqz7aqZ5Q8ha2tJzQEhAwvYxoCZLUj4qcjuCbnfd2GhRR21kOUUOKV3y7nnMrSr1f8fYt-g',
          'CnRvAAAAB3ntzBSgHW1VYtS69c-T0dBzH1CvJTs3DCkrLMNbGxXcJ6hkEn5PB8giXFHtVZ7aezijN_zxfi-J4qAGCg0MDeB48uGYtwNpYg1mkMaLcA1FjJGuBGvbP1X3XxKsbcYC-eWNyIOnihpb84cM5aPFXBIQ45jym9e6bNMFbZFf4W6DUxoUlTDhPiSgGCx06tsFrU-pmw88WQc'
        ],
        [ // Uppsala-Stockholm

          'CoQBcgAAAAXDvviSwTCDorP6etcMsJGHook-mF7HitzAlTESEV2tATHmYxHFABHe6dUg--_ize-binVXnarvP1ksfigTm3RBdfsnCAqrVwxPm0Tn1_ZQlTE182ybBI77UwKuRy3trNAoY3VdxVqY5qyBPP_7cJI3xLR8D4J4g1Ujbp9cukr5EhD0S_tOb86Xd_DunS_6hw3dGhSr585ajh2-ZouLhZSDvc9sYkcXIg',
          'CoQBdAAAAN5GuBaVDR3ZsDZEVpGOxZ1V9EwtZTkJHSfcqJGSyG5J_yyQTWm3jExGRRTihSj-xRKk6AHJPrBva1kSjwRxT_iNJCq7uJqOQExIgvHMLvUFnRzHXT1iuprvAXQt1_1U5hhjsWSjMPWkZNa88vcnoH_e9AMXbFkgtnCAfCdJpBUoEhBuQ8TxDf83hLPrR8tVLvCjGhSZ9yA7tgb_FVgFo9dTEDBNidflkw'
        ],
        [ // Berlin-Hamburg
          'CoQBcgAAANHnKbWNcmxd76TARBxbSj5Fc89B0gR3ooak5C3jneiDmbjgTeaGCR2luQ2daZfBVCCNvF63Yb2m4NEKDJBheWX_uJRwdYGqb2Tyo_4TMCLsCw4FsBZkGetpldQY0TJoITNgia6jSs8PCfq2P_e2wXrlDFF0Eq7ZrqSssg7dLRDuEhABZVM4b1Riu2EEuknXCRyEGhQ5NpdUE3afnr9zKfsG2sNPrjufCA',
          'CoQBcwAAAAgARr7YUjaYXLcKNiUJfLK9Uh4Ho8MEy8XIEBxJUKyBK6eNGpApBX7gW6jArLDCYRTwyzHDZABEB1TetuIbp0Dd3kmei9d1RedzdTuBNiPSj20CHRgwEFsOFlhDi2qq-WadBVbuKfBBoce8TUGW_5-CoF0cTwufbyRqNBx625sXEhBqc-eDvpKJT-oLzf7wDoLWGhSZeWZWo3S64nsEvlu5bDJSwi6LMQ'
        ]
      ];

      var trip = trips[Math.floor(Math.random()*trips.length)];
      var el = Math.round(Math.random());
      $location.path('/trip/' + trip[el] + '/' + trip[1-el] + '/');
    };

  }]);
