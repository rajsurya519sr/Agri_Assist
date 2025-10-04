// Simple Map Initialization
function initMap() {
    console.log('Map initialization started...');
    
    // Check if OpenLayers is loaded
    if (typeof ol === 'undefined') {
        const errorMsg = 'OpenLayers is not defined! Make sure the OpenLayers script is loaded before this file.';
        console.error(errorMsg);
        showMapError('Map library not loaded. Please refresh the page.');
        return false;
    }
    
    console.log('OpenLayers version:', ol.getUid(ol));
    console.log('OpenLayers available objects:', Object.keys(ol).filter(k => typeof ol[k] === 'function'));

    // Check if map container exists
    const mapElement = document.getElementById('map');
    if (!mapElement) {
        const errorMsg = 'Map container element with id "map" not found in the DOM';
        console.error(errorMsg);
        return false;
    }

    console.log('Map container found:', mapElement);
    console.log('Map container dimensions:', {
        width: mapElement.offsetWidth,
        height: mapElement.offsetHeight,
        computedStyle: window.getComputedStyle(mapElement)
    });

    try {
        // Clear any existing map content
        mapElement.innerHTML = '';
        
        // Create map instance
        const map = new ol.Map({
            target: 'map',
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM({
                        crossOrigin: 'anonymous',
                        attributions: [
                            '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        ]
                    }),
                    visible: true,
                    title: 'OpenStreetMap',
                    type: 'base'
                })
            ],
            view: new ol.View({
                center: ol.proj.fromLonLat([78.9629, 20.5937]), // Center of India
                zoom: 5,
                minZoom: 2,
                maxZoom: 18
            }),
            controls: ol.control.defaults({
                attribution: true,
                attributionOptions: {
                    collapsible: false
                }
            }).extend([
                new ol.control.ScaleLine(),
                new ol.control.Zoom(),
                new ol.control.FullScreen()
            ])
        });

        // Add a marker at the center of India
        const marker = new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.fromLonLat([78.9629, 20.5937]))
        });

        const vectorSource = new ol.source.Vector({
            features: [marker]
        });

        const markerVectorLayer = new ol.layer.Vector({
            source: vectorSource,
            style: new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 7,
                    fill: new ol.style.Fill({color: 'red'}),
                    stroke: new ol.style.Stroke({
                        color: 'white',
                        width: 2
                    })
                })
            })
        });

        map.addLayer(markerVectorLayer);

        // Add click event to the map
        map.on('click', function(evt) {
            const coordinate = evt.coordinate;
            const hdms = ol.coordinate.toStringHDMS(ol.proj.toLonLat(coordinate));
            console.log('Map clicked at:', hdms);
        });

        // Debug: Check map state after initialization
        setTimeout(() => {
            console.log('Map view state:', {
                center: map.getView().getCenter(),
                zoom: map.getView().getZoom(),
                size: map.getSize(),
                target: map.getTarget(),
                targetElement: map.getTargetElement()
            });
            
            // Force map update
            map.updateSize();
            
            // Add debug styles to the map element
            const mapElement = document.getElementById('map');
            if (mapElement) {
                mapElement.style.border = '2px solid #28a745';
                mapElement.style.boxSizing = 'border-box';
                mapElement.setAttribute('style', mapElement.getAttribute('style') + '; border: 2px solid #28a745; box-sizing: border-box;');
            }
        }, 1000);

        console.log('Map initialized successfully');
        return map;

        // Handle window resize
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                map.updateSize();
            }, 100);
        });

        // Make map available globally for debugging
        window.map = map;
        console.log('Map initialized successfully');
        
        // Force a resize to ensure the map renders correctly
        setTimeout(() => {
            map.updateSize();
        }, 100);

    } catch (error) {
        console.error('Error initializing map:', error);
        showMapError('Failed to initialize map: ' + error.message);
    }
}

// Helper function to show error message in the map container
function showMapError(message) {
    const mapElement = document.getElementById('map');
    if (mapElement) {
        mapElement.innerHTML = `
            <div class="alert alert-danger" style="margin: 20px; padding: 20px;">
                <h4>Map Loading Error</h4>
                <p>${message}</p>
                <p>Please refresh the page to try again.</p>
            </div>
        `;
    }
}

// Test function to verify map container is working
function testMapContainer() {
    const mapElement = document.getElementById('map');
    if (mapElement) {
        // Add a test message to the map container
        const testDiv = document.createElement('div');
        testDiv.style.position = 'absolute';
        testDiv.style.top = '10px';
        testDiv.style.left = '10px';
        testDiv.style.zIndex = '1000';
        testDiv.style.padding = '10px';
        testDiv.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
        testDiv.style.border = '2px solid #28a745';
        testDiv.style.borderRadius = '4px';
        testDiv.style.fontFamily = 'monospace';
        testDiv.innerHTML = 'Map container is working!<br>OpenLayers version: ' + (typeof ol !== 'undefined' ? ol.getUid(ol) : 'Not loaded');
        
        mapElement.appendChild(testDiv);
        
        // Log container info
        console.log('Map container test:', {
            element: mapElement,
            dimensions: {
                width: mapElement.offsetWidth,
                height: mapElement.offsetHeight,
                style: window.getComputedStyle(mapElement)
            },
            children: mapElement.children.length
        });
    } else {
        console.error('Map container not found for testing');
    }
}

// Initialize the map when the DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        testMapContainer();
        initMap();
    });
} else {
    // DOM is already ready
    testMapContainer();
    initMap();
}
