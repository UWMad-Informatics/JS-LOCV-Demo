
function norm(array) {
  a = _.min(array);
  b = _.max(array);
  ra = 1;
  rb = 0;
  return _.map(array,
    (p) => {
      return (((ra-rb) * (p - a)) / (b - a)) + rb;
    })
}

function calcRMSE(arr1, arr2) {
  return jStat.meansqerr(_.map(_.range(arr1.length), 
    (i) => {
      return arr2[i] - arr1[i];
    })
  );
}

function getPredData(input_data, network, output_data) {
  return _.map(input_data, 
    (x) => {
      var temp = network.activate([
        (x-_.min(input_data))/(_.max(input_data)-_.min(input_data))
      ])[0] 
      * (_.max(output_data)-_.min(output_data)) + _.min(output_data);
      // console.log(temp)
      return temp;
    }
  );
}

function plot(x_data, y_data,xlabel,ylabel,HTML) {
  if (!xlabel)
    xlabel="X";
  if (!ylabel)
    ylabel="Y";
  let layout = {
    xaxis: {title: xlabel},
    yaxis: {title: ylabel},
    
    margin: { t: 0 }
  }
  Plotly.plot( HTML, [{
      x: x_data,
      y: y_data,
      mode: 'markers',
      type: 'scatter'
    }], layout );
}