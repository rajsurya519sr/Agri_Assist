// DOM Ready
$(document).ready(function() {
    console.log('DOM fully loaded, initializing components...');
    
    // Initialize tooltips
    $('[data-toggle="tooltip"]').tooltip();
    
    // Initialize popovers
    $('[data-toggle="popover"]').popover();
    
    // Handle form submissions with loading states
    $('form').on('submit', function() {
        const submitBtn = $(this).find('button[type="submit"]');
        submitBtn.prop('disabled', true);
        submitBtn.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Processing...');
    });
    
    // Handle file input changes
    $('.custom-file-input').on('change', function() {
        const fileName = $(this).val().split('\\').pop();
        $(this).next('.custom-file-label').addClass('selected').html(fileName);
    });
    
    console.log('Main components initialized');
});

// Handle AJAX form submissions
function submitForm(form, successCallback, errorCallback) {
    const formData = new FormData(form);
    
    $.ajax({
        url: form.action,
        type: form.method,
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
            if (successCallback && typeof successCallback === 'function') {
                successCallback(response);
            }
        },
        error: function(xhr, status, error) {
            console.error('Error:', error);
            if (errorCallback && typeof errorCallback === 'function') {
                errorCallback(xhr, status, error);
            } else {
                alert('An error occurred. Please try again.');
            }
        },
        complete: function() {
            // Re-enable submit button
            const submitBtn = $(form).find('button[type="submit"]');
            submitBtn.prop('disabled', false);
            submitBtn.html('Submit');
        }
    });
}

// Format date to local string
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Show notification
function showNotification(message, type = 'success') {
    const alert = $(`
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    `);
    
    $('.notifications').append(alert);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        alert.alert('close');
    }, 5000);
}
