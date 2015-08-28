var Stiff = function (O) {'use strict';

  // (C) Andrea Giammarchi - MIT Style License

  var
    create = O.create,
    freeze = O.freeze || O,
    gPO = O.getPrototypeOf,
    OProto = O.prototype,
    StiffProto = Stiff.prototype
  ;

  function Stiff(data) {
    return StiffProto.branch(data || OProto);
  }

  freeze(O.defineProperties(
    StiffProto,
    {
      branch: {value: function branch(data) {
        var descriptors = {}, key;
        for (key in data) descriptors[key] = {
          enumerable: true,
          value: freeze(data[key])
        };
        return freeze(create(this, descriptors));
      }},
      head: {value: function head(which) {
        var i = which || 1, parent = this;
        while (i--) {
          parent = gPO(parent);
          if (parent === StiffProto) return null;
        }
        return parent;
      }},
      merge: {value: function merge() {
        return Stiff(this);
      }}
    }
  ));

  try { module.exports = freeze(Stiff); } catch(meh) { /*\_(ツ)_/*/ }

  return Stiff;

}(Object);