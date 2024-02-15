  function findMaxCrossingSubarray(arr, low, mid, high) {
    let leftmax = -9999;
    let rightmax = -9999;
    let sum = 0;
    let tot=0;

    for (let i = mid; i >= low; i--) {
      sum += arr[i];
      if (sum > leftmax) {
        leftmax = sum;
      }
    }

   
    sum = 0;
    for (let i = mid + 1; i <= high; i++) {
      sum += arr[i];
      if (sum > rightmax) {
        rightmax = sum;
      }
    }
    tot = leftmax + rightmax ;
    

    return tot ;
}

  function findMaximumSubarray(arr, low, high) {
    if (low === high) {
      return arr[low];
    } 
    else {
      const mid = Math.floor((low + high) / 2);
      const leftSubarray = findMaximumSubarray(arr, low, mid);
      const rightSubarray = findMaximumSubarray(arr, mid + 1, high);
      const crossingSubarray = findMaxCrossingSubarray(arr, low, mid, high);

      if (leftSubarray >= rightSubarray && leftSubarray >= crossingSubarray)
       {
        return `maximum is ${leftSubarray} from the leftsubarray `;
      } 
      else if (rightSubarray >= leftSubarray && rightSubarray >= crossingSubarray)
       {
        return `maximum is ${rightSubarray} from the rightsubarray `;
      } 
      else {
        return `maximum is ${crossingSubarray} from the crosssubarray `;
      }
    }
  }

  const array = [-2, -3, 4, -1, -2, 1, 5, -3];
  const anwser=findMaximumSubarray(array,0,array.length-1);
  console.log(anwser);